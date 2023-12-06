/**
 * A decorator is a way to wrap a story in extra “rendering” functionality. Many addons define decorators
 * in order to augment stories:
 * - with extra rendering
 * - gather details about how a story is rendered
 *
 * When writing stories, decorators are typically used to wrap stories with extra markup or context mocking.
 *
 * https://storybook.js.org/docs/react/writing-stories/decorators
 */
import type { Renderer, ProjectAnnotations } from "@storybook/types";
import { PARAM_GLOBAL_KEY } from "./constants";
import { stackblitzButton } from "./stackblitzButton";

const preview: ProjectAnnotations<Renderer> = {
  decorators: [stackblitzButton],
  globals: {
    [PARAM_GLOBAL_KEY]: {
        stackblitzAdditionalDependency: {
          "@ironsource/fusion-ui": '7.0.0-rc.1'
        }
    },
  },
};

export default preview;
