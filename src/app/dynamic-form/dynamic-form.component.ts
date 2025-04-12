import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dynamic-form',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent {
  applicationName: string = '';
  projectName: string = '';

  responseBodyData: { [key: string]: any } = {};

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const fileContent = reader.result as string;
        const parsedJson = JSON.parse(fileContent);

        this.responseBodyData = parsedJson?.response?.responseBody || {};
        console.log(this.responseBodyData);
      } catch (err) {
        console.error('Invalid JSON file:', err);
      }
    };

    reader.readAsText(file);
  }
}
