// custom typefaces
import "typeface-montserrat";
import "typeface-merriweather";

const shouldUpdateScroll = args => {
  const windowWidth = window.innerWidth;
// Scroll position only matters on mobile as on larger screens, we use a
// modal.
  return windowWidth < 750;
};

const onInitialClientRender = () => {
  window.___GATSBYGRAM_INITIAL_RENDER_COMPLETE = true;
};

export { onInitialClientRender, shouldUpdateScroll };
export { wrapPageElement } from "./src/context/locale-context";
