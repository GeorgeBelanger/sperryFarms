# Sperry Farms
 
**Website can be seen live at [www.sperryfarms.org](www.sperryfarms.org)**

I was commissioned to make this website with the scope being:


>  1. Allow customers to see egg & maple syrup prices and order through email
>  2. Have pictures of the farm
>  3. Have an about us page


<img src="https://cdn.svgporn.com/logos/html-5.svg" 
alt="HTML Icon" width="75" height="75"/><img src="https://cdn.svgporn.com/logos/css-3.svg" 
alt="CSS Icon" width="75" height="75"/><img src="https://cdn.svgporn.com/logos/nodejs-icon.svg" 
alt="Node Icon" width="75" height="75"/><img src="https://cdn.svgporn.com/logos/bootstrap.svg" 
alt="Bootstrap Icon" width="75" height="75"/>      <img src="https://cdn.svgporn.com/logos/jquery.svg" 
alt="jQuery Icon" width="75" height="75"/>

## Table of Contents:  

[Chicken Page](https://github.com/GeorgeBelanger/sperryFarms#chicken-page)<br/>
[Typing Text](https://github.com/GeorgeBelanger/sperryFarms#typing-text)<br/>
[Parallax Scroll](https://github.com/GeorgeBelanger/sperryFarms#parallax-scroll)<br/>
[Carousel](https://github.com/GeorgeBelanger/sperryFarms#carousel) <br/>
[Counting Numbers](https://github.com/GeorgeBelanger/sperryFarms#counting-numbers)<br/>
[Picture page](https://github.com/GeorgeBelanger/sperryFarms#picture-page)<br/>
[AWS Server](https://github.com/GeorgeBelanger/sperryFarms#AWS-server)<br/>


## Chicken Page

![Chick Gif](https://github.com/GeorgeBelanger/sperryFarms/blob/master/Chicken.gif)

When one of the Chicken filters is clicked, all the figures that don't have the data-group that corresponds with the js-shuffle filter selected toggles the active class and shuffles the group, which creates a nice sliding feel.

```javascript
  setupFilters = function() {
    var $btns = $filterOptions.children();
    $btns.on('click', function(e) {
      e.preventDefault();
      var $this = $(this),
          isActive = $this.hasClass( 'active' ),
          group = isActive ? 'all' : $this.data('group');

      if ( !isActive ) {
        $('.js-shuffle-controls li a').removeClass('active');
      }

      $this.toggleClass('active');

      $grid.shuffle('shuffle', group );
    });

    $btns = null;
  }, 
```

On hover the figcaption translates Y 100%

## Typing Text

To do the typing animation, we use typed.js which takes an array of strings, a type speed an a delay and produces our end result.

```javascript
      $(document).on('ready', function () {
        $(".js-display-typing").typed({
          strings: [
            "Fresh Egg",
            "Maple Syrup",
            "Family Fun"
          ],
          typeSpeed: 60,
          loop: true,
          backDelay: 2500
        });
      });
```

## Parallax Scroll

The parallax scroll effect has the background image move slower(or not at all) relative to the rest of the page. This is made easy using parallax.js, a jQuery package, which many parameters but we're only using 2. The first is the background-position, which is set to 50% to have the image centered initially, and the second is the speed at which the image moves with the scroll, here set to .3. In `assets\js\vendors\parallax.js`

```javascript
$('.js-parallax').parallax('50%', 0.3)
```

## Carousel

There are two different carousels used: one landscape for laptop use and one portrait orientation for phone use with only one showing at a time, dependent on screen size. I did it this way because resizing the carousel itself would require image scaling and transforming which would look worse than originally portrait and landscaped photos.

```
@media (min-width: 450px){
  .portrait-carousel{
     display: none;
  }
@media (max-width: 450px){
  .wide-carousel{
    display: none;
  }
```

The carousel items tranisiton by adding a new class, `carousel-item-left` with the CSS properties `transform: translateX(-100%); transition-duration: .6s;` 


## Counting Numbers

For this we use another jQuery package that counts up on any div that has the class js-counter: `<h5 class="js-counter display-4 mb-1">12</h5>`

```javascript
$(document).ready(function(){
    $('.js-counter').counterUp();
  })
```

## Picture Page

This picture page function creates an element for each picture url in my picture table that shows a small resized image that produces a lightbox of the original image when clicked and positions all the images using masonry. 

```javascript
  let list = document.querySelector('.list');
  function createPictureObjects(pictureTable){
    for(i in pictureTable){
      let li = document.createElement('li');
      let img = document.createElement('img');
      let a = document.createElement('a');
      a.href = "assets/img/chickens/" + pictureTable[i]
      img.src = "assets/img/chickens/birme/" + pictureTable[i];
      img.onload = function(){
        msnry.layout();
      }
      a.classList.add('js-popup-image');
      img.classList.add('initialImage');
      a.appendChild(img);
      li.appendChild(a);
      list.appendChild(li);
    
      var msnry = new Masonry( '.list', {
          // options
          itemSelector: 'li',
          fitWidth: true,
      });
    };
  };
```

And outputs the following for each image:

``` 
<li style="position: absolute; left: 864px; top: 0px;">
  <a href="assets/img/chickens/298.JPG" class="js-popup-image">
    <img src="assets/img/chickens/birme/298.JPG" class="initialImage">
  </a>
</li>
```

Masonry is called each time an img is loaded which calculates the position the image should have to balance it with the size and shape of the other images as well as the screen size and adds it in px to the style tag in li.

## AWS Server

  AWS server was also my first implmentation and used EC2, CodeDeploy & Github(instead of S3) and IAM. This wasn't the easiest deployment but I got it done and now the website can be seen at [http://ec2-18-191-187-105.us-east-2.compute.amazonaws.com/](http://ec2-18-191-187-105.us-east-2.compute.amazonaws.com/) It was my first experience using AWS outside of S3 and took a while to figure out. I had to: 
  
    1. Create an EC2 instance
    2. Set up users, groups and roles that could use the instance
    3. Set up puTTy and SSH into the instance
    4. Install git, node, and codedeploy on the instance before installing my repository
    5. Create symbolic links to node, node-waf, npm, and react-scripts
    6. Install pm2 to keep deployment running without an SSH session open
    7. Install nginx to forward from port 80(default broswer port) to port 3000 where the app is live
    
  Next steps would be to host this site on AWS Lambda and figure out SSR!
