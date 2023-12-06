import sdk, {Project} from "@stackblitz/sdk";
import { ANGULAR_PROJECT_PLAYGROUND } from "./config";


export class StackblitzHandler {
  static openStackblitz(title: string, name: string, code: string, dependencyAdd:{[key: string]: string}) {
    const projectData = {...ANGULAR_PROJECT_PLAYGROUND} as Project;

    projectData.files['src/app/wrapper.component.ts'] = code;
    projectData.title = projectData.title.replace('{component}', title);
    projectData.description = 'Story name: ' + name;
    projectData.dependencies = {...projectData.dependencies, ...dependencyAdd };

    sdk.openProject(projectData, {openFile:'src/wrapper.component.ts'});
  }
}