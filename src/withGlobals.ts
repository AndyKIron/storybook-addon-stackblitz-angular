import type {
  Renderer,
  PartialStoryFn as StoryFunction,
  StoryContext,
} from "@storybook/types";
import { useEffect, useGlobals } from "@storybook/preview-api";
import { PARAM_KEY } from "./constants";

export const withGlobals = (
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>
) => {
  const [globals] = useGlobals();
  const myAddon = globals[PARAM_KEY];
  // Is the addon being used in the docs panel
  const isInDocs = context.viewMode === "docs";
  const { theme } = context.globals;

  console.log('>>>', myAddon, context)

  useEffect(() => {
    const rootElementForContent: HTMLElement = document.querySelector(`#anchor--${context.id} .docs-story`);
    if (isInDocs && !!rootElementForContent) {
      displayToolState(rootElementForContent, context);
    }
  }, [myAddon, theme]);

  return StoryFn();
};

function displayToolState(rootElement: HTMLElement, context: StoryContext) {
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

  console.log('context: ', context)

  if(!!context.parameters?.docs?.source?.code){
    stackblitzButton.style.setProperty('cursor', 'pointer');
    stackblitzButton.innerHTML = `Open in <span style="color: #358CFE;">Stackblitz</span>`;

    stackblitzButton.addEventListener('click', (event)=>{
      console.log('Run stackblitz >>>')
      // StackblitzHandler.openStackblitz(context, context.parameters.stackblitzAdditionalDependency);
    })
  }else{
    stackblitzButton.style.setProperty('color', '#678099');
    stackblitzButton.innerHTML = `No Stackblitz available`;
  }
}
