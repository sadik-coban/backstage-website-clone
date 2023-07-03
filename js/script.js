document.body.style.setProperty('--window-height',window.innerHeight + "px")

let issue = 7;
let ISSUEID;
let colors = ["#E30512","#1d3fbb","#ffbe00","#ff6519","#00c1b5","#fff","#ff608c"];

if(window.location.hash) {
  //Load page color
  issue = window.location.hash.charAt(window.location.hash.length - 1)
  document.body.style.backgroundColor = colors[issue - 1]
  ISSUEID = "issue" + issue;
}
else {
  ISSUEID = "issue7"
}

window.addEventListener(
  "hashchange",
  () => {
    //When hash changed load new color
    issue = window.location.hash.charAt(window.location.hash.length - 1)
    document.body.style.backgroundColor = colors[issue - 1]
  },
  false
);

const wheelEvent = (event) => {
    event.preventDefault();
    if(window.location.hash) {
      //When hash changed from searchbar continue scroll from changed link
      issue = window.location.hash.charAt(window.location.hash.length - 1)
    }
    window.scrollBy({
      top: window.innerHeight * Math.sign(event.deltaY),
      left: 0,
      behavior: "smooth",
    });
    document.getElementById(ISSUEID).scrollIntoView({behavior:"smooth"});
  };
  let wheelEventThrottled = _.throttle(wheelEvent, 500);
 

  const updateResize = () => {
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(() => {
      document.body.style.setProperty('--window-height',window.innerHeight + "px")
      document.getElementById(ISSUEID).scrollIntoView();
    }, 250);
  }

  window.addEventListener("resize", updateResize);



let previousY = 0;
let previousRatio = 0;

function Intersect(classNumber) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const currentY = entry.boundingClientRect.y;
      const currentRatio = entry.intersectionRatio;
      const isIntersecting = entry.isIntersecting;
      const square = entry.target.querySelector(".intersect-div");
      // Scrolling down/up
        if (currentY > previousY && isIntersecting) {
        if (currentRatio > previousRatio) {
          issue = classNumber;
          issue = _.clamp(issue,1,7);
          ISSUEID = 'issue' + issue;
          window.location.hash = ISSUEID;
          /*Scrolling up enter*/
        } 
      }
      // We're not intersecting, so remove the class!
      square.classList.remove("intersect-div");
    });
  });

  observer.observe(
    document.querySelector(".intersect-div-wrap" + "-" + classNumber)
  );
}
Intersect(1);
Intersect(2);
Intersect(3);
Intersect(4);
Intersect(5);
Intersect(6);
Intersect(7);

function myFunction(x) {
  if (x.matches) { // If media query matches
    document.removeEventListener("wheel", wheelEventThrottled, {
      passive: false,
    });
  } else {
    document.addEventListener("wheel", wheelEventThrottled, {
      passive: false,
    });
  }
}

var x = window.matchMedia("(max-width: 1000px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction)
