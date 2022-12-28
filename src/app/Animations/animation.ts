import {
  animation, trigger, animateChild, group,
  transition, animate, style, query, state
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
export const slideInAnimation =
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
      query(':enter, :leave', style({ position: 'fixed', width: '100%', zIndex: 2 }), { optional: true }),
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


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/