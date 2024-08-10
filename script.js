let lastScrollTop = 0;

function handleScroll() {
    var nav = document.querySelector(".navigation ul");
    // console.log('SCROLL')

  
    // console.log("done")
    const currentScrollTop = window.scrollY || window.pageYOffset;
  
    if (currentScrollTop > lastScrollTop) {
      // Scrolling down
      onScrollDown(nav);
    } else {
      // Scrolling up
      onScrollUp(nav);
    }
  
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
  }
  
  function onScrollUp(nav) {
    nav.style.borderTopLeftRadius = '0px';
    nav.style.borderBottomLeftRadius = '40px';
    nav.style.borderTopRightRadius = '40px';
    nav.style.borderBottomRightRadius = '0px';
    nav.style.transition = 'all 0.2s ease-in-out';
    console.log('SCROLL up')
  }
  
  function onScrollDown(nav) {
    nav.style.borderTopLeftRadius = '40px';
    nav.style.borderBottomLeftRadius = '0px';
    nav.style.borderTopRightRadius = '0px';
    nav.style.borderBottomRightRadius = '40px';
    nav.style.transition = 'all 0.2s ease-in-out';
    console.log('SCROLL down')

  }
  
  // handleScroll()
  
window.addEventListener("scroll", handleScroll);
  
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.v-cursor');
    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
});

const links = document.querySelectorAll('.v-cursor__link-315');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        // Change cursor on hover
    });
    link.addEventListener('mouseleave', () => {
        // Revert cursor on hover out
    });
});

