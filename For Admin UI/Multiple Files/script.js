let applicationID = "";
window.addEventListener("message", (event) => {
  // Verify the parent's origin for security
  window.parent.postMessage(event.origin, "*");

  if (event.data.type === "applicationID") {
    applicationID = event.data.payload;
    window.parent.postMessage("Received:" + event.data.payload, "*");
  }
});

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.style.display = "none";
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll(".skills-animation");
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: function (direction) {
        let progress = item.querySelectorAll(".progress .progress-bar");
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();

const API_BASE_URL = "https://test.forwardfactory.ai/api";
const USERWEBAPP_ADMIN_URL = `${API_BASE_URL}/network/userwebapp/admin/`;
const CONTRACT_EXECUTE_URL = `${API_BASE_URL}/contract/execute/`;

const fetchAppData = async (applicationID) => {
  const response = await fetch(USERWEBAPP_ADMIN_URL + applicationID);
  if (!response.ok) {
    throw new Error(`Failed to fetch app data: ${response.statusText}`);
  }
  return await response.json();
};

const executeContractFunction = async (appId, functionName) => {
  const response = await fetch(CONTRACT_EXECUTE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      application_uuid: appId,
      function_name: functionName,
      parsed_params: [],
    }),
  });
  if (!response.ok) {
    throw new Error(
      `Failed to execute contract function: ${response.statusText}`
    );
  }
  return await response.json();
};

const onRead = async (index, target) => {
  const preloader = document.querySelector("#preloader");
  try {
    if (preloader) {
      preloader.style.display = "block";
    }
    const app = await fetchAppData(applicationID);

    if (app.adminAppId) {
      const result = await executeContractFunction(
        app.adminAppId,
        app.contractAbi[index].name
      ); // index of function in contractAbi
      document.getElementById(target).innerHTML = result.result;
    } else {
      window.parent.postMessage("Invalid application data: " + app, "*");
    }
    if (preloader) {
      preloader.style.display = "none";
    }
  } catch (error) {
    window.parent.postMessage("ERROR OCCURRED: " + error, "*");
    if (preloader) {
      preloader.style.display = "none";
    }
  }
};

const onWrite = async (index, result, param1 = "", param2 = "") => {
  const preloader = document.querySelector("#preloader");
  try {
    if (preloader) {
      preloader.style.display = "block";
    }

    if (!window.ethereum) {
      alert("Please install MetaMask!");
      throw Error("Metamask not installed");
    }

    const app = await fetchAppData(applicationID);

    if (app.adminAppId) {
      // Connect to MetaMask
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      provider.on("network", (newNetwork, oldNetwork) => {
        // When a Provider makes its initial connection, it emits a "network"
        // event with a null oldNetwork along with the newNetwork. So, if the
        // oldNetwork exists, it represents a changing network
        if (oldNetwork) {
          window.location.reload();
        }
      });
      const signer = await provider.getSigner();

      // Initialize contract
      const contract = new ethers.Contract(
        app.contractAddress,
        app.contractAbi,
        signer
      );

      const functionName = app.contractAbi[index].name;
      let tx;
      if (app.contractAbi[index].inputs.length === 1) {
        const val1 = document.getElementById(param1).value;
        tx = await contract[functionName](val1);
      } else if (app.contractAbi[index].inputs.length === 2) {
        const val1 = document.getElementById(param1).value;
        const val2 = document.getElementById(param2).value;
        tx = await contract[functionName](val1, val2);
      }

      await tx.wait();

      document.getElementById(result).innerHTML = tx.hash;
    } else {
      window.parent.postMessage("Invalid application data: " + app, "*");
    }
    if (preloader) {
      preloader.style.display = "none";
    }
  } catch (error) {
    window.parent.postMessage("ERROR OCCURRED: " + error, "*");
    if (preloader) {
      preloader.style.display = "none";
    }
  }
};
