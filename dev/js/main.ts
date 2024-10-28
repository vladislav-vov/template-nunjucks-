import { forEach } from "lodash-es";
import Popup from "components/controls/popup/popup";
import { event } from "jquery";
import gsap from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  let screenWidth: number = getScreenWidth();

  HiderCards(screenWidth);

  const popupTogglers = document.querySelectorAll<HTMLButtonElement>(
    "[data-popup-toggle]"
  );

  if (popupTogglers.length > 0) {
    popupTogglers.forEach((popupToggler) => {
      popupToggler.addEventListener("click", function () {
        this.classList.toggle("is-active");

        // toggleBlockVisibility(menuList, this.classList.contains('is-active'));
      });
    });
  }
  popupTogglers.forEach((popupToggler) => {
    popupToggler.addEventListener("click", (e) => {
      e.preventDefault();

      const toggleId = popupToggler.getAttribute("data-popup-toggle");
      const popup = document.querySelector<HTMLElement>(
        `[data-popup="${toggleId}"]`
      );

      toggleBlockVisibility(
        popup,
        popupToggler.classList.contains("is-active")
      );
    });
  });

  popupTogglers.forEach((popupToggler) => {
    const useElement = popupToggler.querySelector(".svg-ico use");
    const svgElement = popupToggler.querySelector("svg");

    popupToggler.addEventListener("click", () => {
      svgElement?.classList.toggle("svg-ico_no_stroke");
      if (popupToggler.classList.contains("is-active")) {
        useElement?.setAttribute("xlink:href", "#cross");
      } else {
        useElement?.setAttribute("xlink:href", "#katalog");
      }
    });
  });

  const acnTogglers =
    document.querySelectorAll<HTMLElement>("[data-acn-toggle]");

  acnTogglers.forEach((acnToggler: HTMLElement) => {
    const useElement = acnToggler.querySelector(".svg-ico use");

    acnToggler.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = this.getAttribute("data-acn-toggle");
      acnToggler.classList.toggle("is-active");

      if (acnToggler.classList.contains("is-active")) {
        useElement?.setAttribute("href", "#cross");
      } else {
        useElement?.setAttribute("href", "#katalog");
      }

      if (targetId) {
        const targetElement = document.querySelector(
          `[data-acn="${targetId}"]`
        );

        if (targetElement) {
          targetElement.classList.toggle("d-none");
        }
      }
    });
  });

  // Search

  const headerActions = document.querySelector(".inter-list__actions");

  const searchForm = document.querySelector(".search-form");

  if (searchForm) {
    const searchFormBtn = searchForm.querySelector(".search-form__btn");
    const searchFormClose = searchForm.querySelector(".search-form__close");
    const searchItem = document.querySelector(".inter-list__item-search");

    searchFormBtn?.addEventListener("click", (e) => {
      e.preventDefault();

      searchItem?.classList.add("inter-list__item-search_visible");
      searchForm?.classList.toggle("search-form_open");

      if (headerActions?.classList.contains("inter-list__actions_hidden")) {
        setTimeout(() => {
          headerActions?.classList.toggle("inter-list__actions_hidden");
          searchItem?.classList.remove("inter-list__item-search_visible");
        }, 300);
      } else {
        headerActions?.classList.add("inter-list__actions_hidden");
      }
    });
  }
});

// Hiders

function HiderCards(sW: number): void {
  const cards = document.querySelectorAll<HTMLDivElement>("[data-card]");
  let i: number = 0;
  if (sW < 640) {
    cards.forEach((card, index) => {
      if (index > 2) {
        card.classList.add("d-none");
      }
      i++;
    });
  } else if (sW < 744) {
    cards.forEach((card, index) => {
      if (index > 3) {
        card.classList.add("d-none");
      }
      i++;
    });
  } else if (sW < 1440) {
    cards.forEach((card, index) => {
      if (index > 2) {
        card.classList.add("d-none");
      }
      i++;
    });
  } else {
    cards.forEach((card) => {
      card.classList.remove("d-none");
    });
  }
}

function toggleBlockVisibility(block: HTMLElement | null, condition: boolean) {
  if (condition) {
    block?.classList.remove("d-none");
  } else {
    block?.classList.add("d-none");
  }
}

function getScreenWidth(): number {
  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  );
}

window.addEventListener("resize", () => {
  const screenWidth = getScreenWidth();
  const menuListXs = document.querySelector<HTMLDivElement>(
    '[data-popup="popup-menu-xs"]'
  );
  const menuListMd = document.querySelector<HTMLDivElement>(
    '[data-popup="popup-menu-md"]'
  );
  const hamburger = document
    .querySelector<HTMLButtonElement>('[data-popup-toggle="popup-menu-xs"]')
    ?.classList.contains("is-active");
  const hamburgerMd = document
    .querySelector<HTMLButtonElement>('[data-popup-toggle="popup-menu-md"]')
    ?.classList.contains("is-active");
  if (hamburger && screenWidth < 744) {
    toggleBlockVisibility(menuListXs, true);
  } else if (hamburgerMd && screenWidth > 739) {
    toggleBlockVisibility(menuListMd, true);
  } else {
    toggleBlockVisibility(menuListXs, false);
    toggleBlockVisibility(menuListMd, false);
  }

  HiderCards(screenWidth);
});
