import {ElementRef} from "@angular/core";
import {vertexGlsl as vertex} from "./shaders/vertex";
import {fragmentGlsl as fragment} from "./shaders/fragment";
import {loadImages, Rect, RectInterface, Uniform} from "./utils";

export class Fake3d {
  private readonly canvas: any;
  private readonly originalImagePath: string;
  private readonly depthMapImagePath: string;
  private readonly imageURLs: string[];
  private readonly startTime: number;
  private readonly verticalThreshold: number;
  private readonly horizontalThreshold: number;
  public gl: WebGLRenderingContext;
  private ratio: number = window.devicePixelRatio;
  private windowWidth: number = window.innerWidth;
  private windowHeight: number = window.innerHeight;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private mouseTargetX: number = 0;
  private mouseTargetY: number = 0;
  private textures: (WebGLTexture | null)[] = [];
  private program: WebGLProgram | null = null;

  private uResolution: Uniform | null = null;
  private uMouse: Uniform | null = null;
  private uTime: Uniform | null = null;
  private uRatio: Uniform | null = null;
  private uThreshold: Uniform | null = null;
  private billboard: RectInterface | null = null;
  private positionLocation: number = 0;
  private imageAspect: number = 0;
  private width: number = 0;
  private height: number = 0;

  constructor(canvas: ElementRef,
              originalImagePath: string,
              depthMapImagePath: string,
              verticalThreshold: number,
              horizontalThreshold: number) {
    this.canvas = canvas.nativeElement;
    console.log(this.canvas, 'canvas');
    this.gl = canvas.nativeElement.getContext('webgl');
    this.originalImagePath = originalImagePath;
    this.depthMapImagePath = depthMapImagePath;
    this.imageURLs = [
      this.originalImagePath,
      this.depthMapImagePath
    ];
    this.verticalThreshold = verticalThreshold;
    this.horizontalThreshold = horizontalThreshold;
    this.startTime = new Date().getTime(); // Get start time for animating

    this.createScene();
    this.addTexture();
    this.mouseMove();
    this.resize();
  }

  private createScene() {
    this.program = this.gl.createProgram();

    this.addShader(vertex, this.gl.VERTEX_SHADER);
    this.addShader(fragment, this.gl.FRAGMENT_SHADER);

    if (this.program) {
      this.gl.linkProgram(this.program);
      this.gl.useProgram(this.program);
    }

    this.uResolution = new Uniform('resolution', '4f', this.program, this.gl);
    this.uMouse = new Uniform('mouse', '2f', this.program, this.gl);
    this.uTime = new Uniform('time', '1f', this.program, this.gl);
    this.uRatio = new Uniform('pixelRatio', '1f', this.program, this.gl);
    this.uThreshold = new Uniform('threshold', '2f', this.program, this.gl);
    // create position attrib
    this.billboard = new Rect(this.gl);

    this.positionLocation = this.program ? this.gl.getAttribLocation(this.program, 'a_position') : 0;
    this.gl.enableVertexAttribArray(this.positionLocation);
    this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0);
  }

  private addTexture(): void {
    loadImages(this.imageURLs, this.start.bind(this));
  }

  private mouseMove(): void {
    document.addEventListener('mousemove', (e: MouseEvent) => {
      const halfX = this.windowWidth / 2;
      const halfY = this.windowHeight / 2;

      this.mouseTargetX = (halfX - e.clientX) / halfX;
      this.mouseTargetY = (halfY - e.clientY) / halfY;
    });
  }

  private resize() {
    this.resizeHandler();
    window.addEventListener('resize', this.resizeHandler.bind(this));
  }

  private resizeHandler(): void {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width * this.ratio;
    this.canvas.height = this.height * this.ratio;
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
    let a1;
    let a2;

    if (this.height / this.width < this.imageAspect) {
      a1 = 1;
      a2 = (this.height / this.width) / this.imageAspect;
    } else {
      a1 = (this.width / this.height) * this.imageAspect;
      a2 = 1;
    }
    if (this.uResolution) {
      this.uResolution.set(this.width, this.height, a1, a2);
    }

    if (this.uRatio) {
      this.uRatio.set(1 / this.ratio);
    }

    if (this.uThreshold) {
      this.uThreshold.set(this.horizontalThreshold, this.verticalThreshold);
    }

    this.gl.viewport(0, 0, this.width * this.ratio, this.height * this.ratio);
  }

  private addShader(source: string, type: number): void {
    const shader: WebGLShader | null = this.gl.createShader(type);

    if (shader) {
      this.gl.shaderSource(shader, source);
      this.gl.compileShader(shader);
      const isCompiled = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
      if (!isCompiled) {
        throw new Error('Shader compile error: ' + this.gl.getShaderInfoLog(shader));
      }
      if (this.program) {
        this.gl.attachShader(this.program, shader);
      }
    }
  }

  private start(images: HTMLImageElement[]): void {

    this.imageAspect = images[0].naturalHeight / images[0].naturalWidth;

    for (let i = 0; i < images.length; i++) {
      const texture = this.gl.createTexture();
      this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

      // Set the parameters so we can render any size image.
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

      // Upload the image into the texture.
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, images[i]);
      this.textures.push(texture);
    }

    // lookup the sampler locations.
    if (!this.program) {
      return
    }
    const u_image0Location: WebGLUniformLocation | null = this.gl.getUniformLocation(this.program, 'image0');
    const u_image1Location: WebGLUniformLocation | null = this.gl.getUniformLocation(this.program, 'image1');

    // set which texture units to render with.
    this.gl.uniform1i(u_image0Location, 0); // texture unit 0
    this.gl.uniform1i(u_image1Location, 1); // texture unit 1

    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[0]);
    this.gl.activeTexture(this.gl.TEXTURE1);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[1]);

    // start application
    this.resize();
    this.render();
  }

  private render(): void {
    const now = new Date().getTime();
    const currentTime = ( now - this.startTime ) / 1000;

    if (this.uTime) {
      this.uTime.set(currentTime);
    }

    // inertia
    this.mouseX += (this.mouseTargetX - this.mouseX) * 0.05;
    this.mouseY += (this.mouseTargetY - this.mouseY) * 0.05;

    if (this.uMouse) {
      this.uMouse.set(this.mouseX, this.mouseY);
    }

    // render
    if (this.billboard) {
      this.billboard.render(this.gl);
    }

    requestAnimationFrame(this.render.bind(this));
  }
}
