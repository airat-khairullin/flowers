export function loadImage(url: any, callback: any) {
  const image = new Image();
  image.src = url;
  image.onload = callback;
  return image;
}

export function loadImages(urls: any, callback: any) {
  const images: any[] = [];
  let imagesToLoad = urls.length;

  // Called each time an image finished loading.
  const onImageLoad = () => {
    --imagesToLoad;
    // If all the images are loaded call the callback.
    if (imagesToLoad === 0) {
      callback(images);
    }
  };

  for (let ii = 0; ii < imagesToLoad; ++ii) {
    const image = loadImage(urls[ii], onImageLoad);
    images.push(image);
  }
}
export class Uniform {
  public name: string
  public suffix: string
  public program: WebGLProgram | null;
  public gl: WebGLRenderingContext;
  public location: WebGLUniformLocation | null

  constructor(name: string, suffix: string, program: WebGLProgram | null, gl: WebGLRenderingContext) {
    this.name = name;
    this.suffix = suffix;
    this.gl = gl;
    this.program = program;
    this.location = program ? gl.getUniformLocation( program, name ): null;
  }

  public set(...values: any[]) {
    const method = 'uniform' + this.suffix;
    const args = [ this.location ].concat( values );
    // @ts-ignore
    this.gl[method].apply( this.gl, args );
  }
}
export interface RectInterface {
  verts: Float32Array;
  render(gl: WebGLRenderingContext): void;
}
export class Rect implements RectInterface {
  public verts = new Float32Array([
    -1, -1,
    1, -1,
    -1, 1,
    1, 1,
  ]);

  constructor(gl: WebGLRenderingContext) {
    const buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.verts, gl.STATIC_DRAW );
  }

  public render(gl: WebGLRenderingContext): void {
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
  }
}

export function clamp(number: any, lower: any, upper: any) {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}

