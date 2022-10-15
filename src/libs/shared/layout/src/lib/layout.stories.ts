import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { FormFieldModule } from '@sc/sdk/form-field';
import { InputModule } from '@sc/sdk/input';
import { LayoutStoriesModule } from './layout-stories.module';

storiesOf('Layout', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        InputModule,
        FormFieldModule,
        LayoutStoriesModule
      ]
    })
  )
  .add('12 column layout', context => {
    return {
      template: `
      <div class="sc-grid">
        <div class="u-mt-10 sc-offset-1 sc-col-10">

        <div class="sc-grid">
          <sc-form-field class="sc-col-2">
            <input scInput placeholder="col-2">
          </sc-form-field>
          <sc-form-field class="sc-col-2">
            <input scInput placeholder="col-2">
          </sc-form-field>
          <sc-form-field class="sc-col-2">
            <input scInput placeholder="col-2">
          </sc-form-field>
          <sc-form-field class="sc-col-2">
            <input scInput placeholder="col-2">
          </sc-form-field>
          <sc-form-field class="sc-col-2">
            <input scInput placeholder="col-2">
          </sc-form-field>
          <sc-form-field class="sc-col-2">
            <input scInput placeholder="col-2">
          </sc-form-field>
        </div>

        <div class="sc-grid">
          <sc-form-field class="sc-col-3">
            <input scInput placeholder="col-3">
          </sc-form-field>
          <sc-form-field class="sc-col-3">
            <input scInput placeholder="col-3">
          </sc-form-field>
          <sc-form-field class="sc-col-3">
            <input scInput placeholder="col-3">
          </sc-form-field>
          <sc-form-field class="sc-col-3">
            <input scInput placeholder="col-3">
          </sc-form-field>
        </div>

        <div class="sc-grid">
          <sc-form-field class="sc-col-4">
            <input scInput placeholder="col-4">
          </sc-form-field>
          <sc-form-field class="sc-col-4">
            <input scInput placeholder="col-4">
          </sc-form-field>
          <sc-form-field class="sc-col-4">
            <input scInput placeholder="col-4">
          </sc-form-field>
        </div>

        <div class="sc-grid">
          <sc-form-field class="sc-col-6">
            <input scInput placeholder="col-6">
          </sc-form-field>
          <sc-form-field class="sc-col-6">
            <input scInput placeholder="col-6">
          </sc-form-field>
        </div>

        <sc-form-field>
          <input scInput placeholder="col-12">
        </sc-form-field>

        </div>
      </div>
      `
    };
  })
  .add(
    'Responsive layout',
    context => {
      return {
        template: `
      <div class="sc-grid">
      <div class="u-mt-10 sc-offset-1 sc-col-xs-10 sc-col-10 sc-col-lg-8 sc-col-xl-8">

      <div class="sc-grid">
        <sc-form-field class="sc-col-2 sc-col-xs-12">
          <input scInput placeholder="col-2">
        </sc-form-field>
        <sc-form-field class="sc-col-2 sc-col-xs-12">
          <input scInput placeholder="col-2">
        </sc-form-field>
        <sc-form-field class="sc-col-2 sc-col-xs-12">
          <input scInput placeholder="col-2">
        </sc-form-field>
        <sc-form-field class="sc-col-2 sc-col-xs-12">
          <input scInput placeholder="col-2">
        </sc-form-field>
        <sc-form-field class="sc-col-2 sc-col-xs-12">
          <input scInput placeholder="col-2">
        </sc-form-field>
        <sc-form-field class="sc-col-2 sc-col-xs-12">
          <input scInput placeholder="col-2">
        </sc-form-field>
      </div>

      <div class="sc-grid">
        <sc-form-field class="sc-col-3 sc-col-xs-12">
          <input scInput placeholder="col-3">
        </sc-form-field>
        <sc-form-field class="sc-col-3 sc-col-xs-12">
          <input scInput placeholder="col-3">
        </sc-form-field>
        <sc-form-field class="sc-col-3 sc-col-xs-12">
          <input scInput placeholder="col-3">
        </sc-form-field>
        <sc-form-field class="sc-col-3 sc-col-xs-12">
          <input scInput placeholder="col-3">
        </sc-form-field>
      </div>

      <div class="sc-grid">
        <sc-form-field class="sc-col-4 sc-col-xs-6">
          <input scInput placeholder="col-4">
        </sc-form-field>
        <sc-form-field class="sc-col-4 sc-col-xs-6">
          <input scInput placeholder="col-4">
        </sc-form-field>
        <sc-form-field class="sc-col-4 sc-col-xs-6">
          <input scInput placeholder="col-4">
        </sc-form-field>
      </div>

      <div class="sc-grid">
        <sc-form-field class="sc-col-6 sc-col-xs-12">
          <input scInput placeholder="col-6">
        </sc-form-field>
        <sc-form-field class="sc-col-6 sc-col-xs-12">
          <input scInput placeholder="col-6">
        </sc-form-field>
      </div>

      <sc-form-field>
        <input scInput placeholder="col-12">
      </sc-form-field>

      </div>
    </div>
      `
      };
    },
    { notes: 'Change the viewport by selecting different devices ' }
  );
