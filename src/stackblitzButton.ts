import type {
    Renderer,
    PartialStoryFn as StoryFunction,
    StoryContext,
} from "@storybook/types";
import {useEffect, useGlobals} from "@storybook/preview-api";
import {PARAM_GLOBAL_KEY, PARAM_STORY_KEY} from "./constants";
import {StackblitzHandler} from "./stackBlitz/handleStackblitz";

export const stackblitzButton = (
    StoryFn: StoryFunction<Renderer>,
    context: StoryContext<Renderer>
) => {
    const [globals] = useGlobals();
    const addonGlobalParameters = globals[PARAM_GLOBAL_KEY];
    const showStackblitzButton = context.parameters[PARAM_STORY_KEY]?.showButton ?? true;
    const isInDocs = context.viewMode === "docs";

    useEffect(() => {
        const rootElementForContent: HTMLElement = document.querySelector(`#anchor--${context.id} .docs-story`);
        if (isInDocs && !!rootElementForContent && !!addonGlobalParameters?.stackblitzAdditionalDependency && showStackblitzButton) {
            displayToolState(rootElementForContent, addonGlobalParameters, context);
        }
    }, [addonGlobalParameters]);

    return StoryFn();
};

function displayToolState(rootElement: HTMLElement, globalParameters: unknown, context: StoryContext) {
    let stackblitzButton = document.createElement('button');
    stackblitzButton.style.setProperty('position', 'absolute');
    stackblitzButton.style.setProperty('bottom', '0');
    stackblitzButton.style.setProperty('right', '90px');
    stackblitzButton.style.setProperty('border', '1px solid rgba(0,0,0,.1)');
    stackblitzButton.style.setProperty('border-bottom', 'none');
    stackblitzButton.style.setProperty('border-radius', '4px 4px 0 0');
    stackblitzButton.style.setProperty('padding', '4px 10px');
    stackblitzButton.style.setProperty('background', 'white');
    stackblitzButton.style.setProperty(
        'font-family',
        '"Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif',
    );
    stackblitzButton.style.setProperty('font-weight', '700');
    stackblitzButton.style.setProperty('font-size', '12px');
    stackblitzButton.style.setProperty('text-decoration', 'none');
    stackblitzButton.style.setProperty('line-height', '16px');

    rootElement.appendChild(stackblitzButton);
    const stackblitzCode = context.parameters[PARAM_STORY_KEY]?.code ?? context.parameters?.docs?.source?.code;

    if (!!stackblitzCode) {
        stackblitzButton.style.setProperty('cursor', 'pointer');
        stackblitzButton.innerHTML = `Open in <span style="color: #358CFE;">Stackblitz</span>`;

        stackblitzButton.addEventListener('click', (event) => {
            // @ts-ignore
            StackblitzHandler.openStackblitz(context.title, context.name, stackblitzCode, globalParameters.stackblitzAdditionalDependency);
        })
    } else {
        stackblitzButton.style.setProperty('color', '#678099');
        stackblitzButton.innerHTML = `No Stackblitz available`;
    }
}
