const footerExpandBtn = document.querySelectorAll(".footer-expand-more-icon");
const checkFooterShow = document.querySelectorAll(".under-heading");
const footerCloseBtn = document.querySelectorAll(".close-icon");

footerCloseBtn.forEach(function (item) {
  item.addEventListener("click", function () {
    const parentElement = item.parentElement;

    const sibling = parentElement.nextElementSibling;
    // Going against DRY rule

    sibling.classList.remove("footer-content-show");
    item.classList.add("close-i-hide");
    item.previousElementSibling.classList.remove("open-i-hide");
  });
});

footerExpandBtn.forEach(function (item) {
  const individualItem = item;

  const footerCloseBtn = item.nextElementSibling;

  individualItem.addEventListener("click", function () {
    const parentElement = individualItem.parentElement;

    const sibling = parentElement.nextElementSibling;

    checkFooterShow.forEach(function (verifyItem) {
      if (verifyItem.classList.contains("footer-content-show")) {
        // Going against DRY rule

        verifyItem.parentElement.firstElementChild.lastElementChild.classList.add(
          "close-i-hide"
        );
        verifyItem.parentElement.firstElementChild
          .querySelector(".footer-expand-more-icon")
          .classList.remove("open-i-hide");
        verifyItem.classList.remove("footer-content-show");
      }

      footerCloseBtn.classList.remove("close-i-hide");
      individualItem.classList.add("open-i-hide");
      sibling.classList.add("footer-content-show");
    });
  });
});


// Second technique: add onclick attribute on footer open and close icons and get the current(clicked) element.