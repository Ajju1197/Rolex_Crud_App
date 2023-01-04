import {
  animation, trigger, animateChild, group,
  transition, animate, style, query, state, stagger
} from '@angular/animations';

export const transAnimation = animation([
  style({
    height: '{{ height }}',
    opacity: '{{ opacity }}',
    backgroundColor: '{{ backgroundColor }}'
  }),
  animate('{{ time }}')
]);

// Routable animations
export const routeAnimation =
  trigger('routeAnimations', [
    transition('HomePage <=> AboutPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('600ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('600ms ease-out', style({ left: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('* <=> AlbumsPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('600ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('600ms ease-out', style({ left: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);

export const fade = 
  trigger('fadeIn', [
    state('void', style({ opacity: 0 })),
    
    transition('void => *,* => void', [
      animate('600ms ease-out')
    ]),
  ])


  export const slideInAnimations = trigger('slideInAnimation', [
    // Transition between any two states
    transition('* <=> *', [
      // Events to apply
      // Defined style and animation function to apply
      // Config object with optional set to true to handle when element not yet added to the DOM
      query(':enter, :leave', style({ position: 'relative', width: '100%', zIndex: 2 }), { optional: true }),
      // group block executes in parallel
      group([
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('600ms ease-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('600ms ease-out', style({ transform: 'translateX(-100%)' }))
        ], { optional: true })
      ])
    ])
  ]);

  export const fadePages = trigger('fadepages', [
    // Transition between any two states
    transition('* <=> *', [
      // Events to apply
      // Defined style and animation function to apply
      // Config object with optional set to true to handle when element not yet added to the DOM
      query(':enter, :leave', style({ position: 'relative', width: '100%', zIndex: 2 }), { optional: true }),
      // group block executes in parallel
      group([
        query(':enter', [
          style({ opacity: 0}),
          animate(2000, style({opacity:1 }))
        ], { optional: true }),
        query(':leave', [
          animate(1000, style({ opacity:0 }))
        ], { optional: true })
      ])
    ])
  ]);

export const slidesTwoWay =
trigger('fadeSlide', [
  transition(':enter', [
    group([
      query('.item:nth-child(odd)', [
        style({ opacity: 0, transform: 'translateX(-250px)' }),
        animate(
          1000,
          style({ opacity: 1, transform: 'translateX(0)' })
        )
      ]),
      query('.item:nth-child(even)', [
        style({ opacity: 0, transform: 'translateX(250px)' }),
        animate(
          1000,
          style({ opacity: 1, transform: 'translateX(0)' })
        )
      ])
    ])
  ]),
  transition(':leave', [
    group([
      query('.item:nth-child(odd)', [
        animate(
          1000,
          style({ opacity: 0, transform: 'translateX(-250px)' })
        )
      ]),
      query('.item:nth-child(even)', [
        animate(
          1000,
          style({ opacity: 0, transform: 'translateX(250px)' })
        ),
      ])
    ])
  ])
])


// Slide Right Element Animation
export const slideElementAnimation =
  trigger('slideElement', [
  transition(':enter', [
    style({ transform: 'translateX(-250px)', opacity: 0 }),
    animate(2000,style({ transform: 'translateX(0)',opacity:1}))
  ])
])
// Slide left Element Animation
export const slideLeftElementAnimation =
  trigger('slideLeftElement', [
  transition(':enter', [
    style({ transform: 'translateX(250px)', opacity: 0 }),
    animate(2000,style({ transform: 'translateX(0)',opacity:1}))
  ])
])
// Slide top Element Animation
export const slideTopElementAnimation =
  trigger('slideTopElement', [
  transition(':enter', [
    style({ transform: 'translateY(-250px)', opacity: 0 }),
    animate(2000,style({ transform: 'translateX(0)',opacity:1}))
  ])
])
// Slide bottom Element Animation
export const slideBottomElementAnimation =
  trigger('slideBottomElement', [
  transition(':enter', [
    style({ transform: 'translateY(250px)', opacity: 0 }),
    animate(2000,style({ transform: 'translateX(0)',opacity:1}))
  ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate(2000,style({opacity:0}))
    ])
])
// Bounce Animation
export const bounceAnimation =
  trigger('bounceAnimation', [
  transition(':enter', [
    style({ transform: 'scale(1.5)', opacity: 0 }),
    animate(2000,style({ transform: 'scale(.5)',opacity:1})),
    animate(2000,style({ transform: 'scale(1)',opacity:1}))
  ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate(2000,style({opacity:0}))
    ])
  ])
  
// Filter animation
export const filterAnimation = 
trigger('filterAnimation', [
  transition(':enter, * => 0, * => -1', []),
  transition(':increment', [
    query(':enter', [
      style({ opacity: 0, width: 0 }),
      stagger(50, [
        animate('300ms ease-out', style({ opacity: 1, width: '*' })),
      ]),
    ], { optional: true })
  ]),
  transition(':decrement', [
    query(':leave', [
      stagger(50, [
        animate('300ms ease-out', style({ opacity: 0, width: 0 })),
      ]),
    ])
  ]),
])

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/