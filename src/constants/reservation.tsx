export const selection = [
    {
        name: 'exterior',
        span: 'Kebulo Plovimas',
        options: [
            {
                name: 'Express Plovimas',
                url: '/images/carWashing.png',
                price: '15.00',
                description: 'Greitas automobilio išorės plovimas, pašalinantis pagrindinius nešvarumus. Puikus pasirinkimas, kai reikia greito rezultato.'
            },
            {
                name: 'Detalus Plovimas',
                url: '/images/carWashing.png',
                price: '30.00',
                description: 'Kruopštus automobilio išorės plovimas, apimantis giliausią purvo ir apnašų valymą, naudojant specialias priemones. Skirta tiems, kas ieško aukščiausio lygio švaros.'
            },
        ],
        toggle: [
            {
                name: 'Kebulo vaskavimas',
                url: '/images/carWaxing.png',
                price: '13.00'
            },
            // {
            //     name: 'Langų hidrofobinė danga',
            //     url: '/images/windowsAnti.png',
            //     price: '13.00'
            // },
            // {
            //     name: 'Padangu vaskavimas',
            //     url: '/images/tiresWaxing.jpg',
            //     price: '13.00'
            // },

        ]
    },
    {
        name: 'interior',
        span: 'Salono Valymas',
        options: [
            {
                name: 'Sausas valymas',
                url: '/images/carCleaning.png',
                price: '35.00',
                description: 'Salono paviršių valymas, pašalinant dulkes, trupinius ir smulkius nešvarumus. Greitas ir paprastas būdas atnaujinti automobilio vidų.'
            },
            {
                name: 'Cheminis valymas',
                url: '/images/carCleaning.png',
                price: '140.00',
                description: 'Kruopštus salono valymas, naudojant specialias chemines priemones, kurios pašalina dėmes, kvapus ir giluminius nešvarumus nuo sėdynių ir kitų paviršių.'
            },
            {
                name: 'Detalus cheminis valymas',
                url: '/images/carCleaning.png',
                price: '180.00',
                description: 'Viso salono valymas, įskaitant sunkiai pasiekiamas vietas. Apima giluminį dėmių, įsisenėjusių nešvarumų ir kvapų šalinimą bei plastikų ir tekstilės atnaujinimą.'
            },
        ],
        toggle: [
            {
                name: 'Sedines',
                url: '/images/seatsCleaning.png',
                price: '25.00'
            },
            {
                name: 'Grindų danga',
                url: '/images/floorCleaning.png',
                price: '25.00'
            },
            {
                name: 'Lubos',
                url: '/images/ceilingWash.png',
                price: '13.00'
            },
            {
                name: 'Bagazine',
                url: '/images/trunkCleaning.png',
                price: '10.00'
            }
        ]
    },
    {
        name: 'polishing',
        span: 'Kėbulo poliravimas ir Nano-keraminę dangą',
        options: [
            {
                name: '1 etapo poliravimas',
                url: '/images/carPolishing.png',
                price: '35.00',
                description: 'Salono paviršių valymas, pašalinant dulkes, trupinius ir smulkius nešvarumus. Greitas ir paprastas būdas atnaujinti automobilio vidų.'
            },
            {
                name: '2 etapu poliravimas',
                url: '/images/carPolishing.png',
                price: '140.00',
                description: 'Kruopštus salono valymas, naudojant specialias chemines priemones, kurios pašalina dėmes, kvapus ir giluminius nešvarumus nuo sėdynių ir kitų paviršių.'
            },
            {
                name: '3 etapu poliravimas',
                url: '/images/carPolishing.png',
                price: '250.00',
                description: 'Viso salono valymas, įskaitant sunkiai pasiekiamas vietas. Apima giluminį dėmių, įsisenėjusių nešvarumų ir kvapų šalinimą bei plastikų ir tekstilės atnaujinimą.'
            },
        ],
        toggle: [
            // {
            //     name: 'Žibintų poliravimas',
            //     url: '/images/headlightPolishing.png',
            //     price: '13.00'
            // },
            {
                name: 'Nano-keraminę dangą',
                url: '/images/wax.png',
                price: '150.00'
            }
        ]
    }
]

export const moreToggles = [
    {
        name: 'Žibintų poliravimas',
        url: '/images/headlightPolishing.png',
        price: '13.00'
    },
    {
        name: 'Langų hidrofobinė danga',
        url: '/images/windowsAnti.png',
        price: '14.00'
    },
    {
        name: 'Padangu vaskavimas',
        url: '/images/tiresWaxing.jpg',
        price: '15.00'
    },
]












//CAR TYPES 
export const carTypes = [
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="80" height="68" viewBox="70 10 120 220" xmlSpace="preserve">
        <defs>
        </defs>
        <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
            <path d="M 73.944 59.742 c -4.001 0 -7.256 -3.255 -7.256 -7.255 s 3.255 -7.255 7.256 -7.255 c 4 0 7.255 3.255 7.255 7.255 S 77.944 59.742 73.944 59.742 z M 73.944 47.232 c -2.898 0 -5.256 2.357 -5.256 5.255 s 2.357 5.255 5.256 5.255 c 2.897 0 5.255 -2.357 5.255 -5.255 S 76.842 47.232 73.944 47.232 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 19.651 59.742 c -4 0 -7.255 -3.255 -7.255 -7.255 s 3.255 -7.255 7.255 -7.255 s 7.255 3.255 7.255 7.255 S 23.651 59.742 19.651 59.742 z M 19.651 47.232 c -2.898 0 -5.255 2.357 -5.255 5.255 s 2.357 5.255 5.255 5.255 c 2.897 0 5.255 -2.357 5.255 -5.255 S 22.548 47.232 19.651 47.232 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 13.974 56.113 c -0.081 0 -0.164 -0.01 -0.247 -0.03 L 2.152 53.146 c -1.469 -0.373 -2.391 -1.83 -2.099 -3.317 l 1.662 -8.442 c 0.426 -2.167 2.339 -3.74 4.547 -3.74 h 2.493 c 1.486 0 2.966 -0.367 4.281 -1.061 l 6.238 -3.293 c 3.762 -1.986 7.998 -3.035 12.25 -3.035 h 10.654 c 4.002 0 7.949 1.062 11.411 3.071 l 8.399 4.874 l 23.719 4.802 C 88.194 43.508 90 45.716 90 48.254 v 3.626 c 0 1.774 -1.331 3.257 -3.096 3.448 l -7.175 0.779 c -0.556 0.057 -1.043 -0.338 -1.103 -0.886 c -0.06 -0.55 0.337 -1.043 0.886 -1.103 l 7.176 -0.779 C 87.437 53.259 88 52.631 88 51.88 v -3.626 c 0 -1.59 -1.131 -2.974 -2.689 -3.289 l -23.88 -4.834 c -0.106 -0.021 -0.209 -0.061 -0.304 -0.115 l -8.542 -4.957 c -3.157 -1.832 -6.756 -2.801 -10.407 -2.801 H 31.524 c -3.929 0 -7.842 0.97 -11.317 2.804 l -6.238 3.293 c -1.601 0.845 -3.404 1.292 -5.214 1.292 H 6.262 c -1.255 0 -2.342 0.894 -2.585 2.126 l -1.661 8.441 c -0.087 0.444 0.188 0.881 0.628 0.992 l 11.575 2.938 c 0.535 0.137 0.859 0.681 0.723 1.216 C 14.828 55.813 14.42 56.113 13.974 56.113 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 68.267 56.113 H 25.329 c -0.552 0 -1 -0.447 -1 -1 s 0.448 -1 1 -1 h 42.938 c 0.553 0 1 0.447 1 1 S 68.819 56.113 68.267 56.113 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 53.462 42.099 H 24.787 c -2.72 0 -5.352 -0.803 -7.608 -2.323 l -3.09 -2.081 c -0.458 -0.309 -0.58 -0.93 -0.271 -1.388 c 0.309 -0.458 0.93 -0.58 1.388 -0.271 l 3.09 2.081 c 1.925 1.296 4.17 1.982 6.491 1.982 h 28.675 c 2.301 0 4.538 -0.464 6.648 -1.38 l 1.121 -0.486 c 0.504 -0.219 1.096 0.014 1.314 0.52 c 0.22 0.507 -0.013 1.096 -0.52 1.315 l -1.12 0.486 C 58.543 41.579 56.038 42.099 53.462 42.099 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 39.396 42.099 c -0.459 0 -0.873 -0.318 -0.976 -0.785 l -2.172 -9.841 c -0.119 -0.539 0.222 -1.073 0.761 -1.192 c 0.536 -0.122 1.073 0.222 1.192 0.761 l 2.172 9.841 c 0.119 0.539 -0.222 1.073 -0.761 1.192 C 39.541 42.092 39.468 42.099 39.396 42.099 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 73.939 53.49 c -0.26 0 -0.51 -0.11 -0.699 -0.301 c -0.101 -0.09 -0.171 -0.199 -0.221 -0.319 s -0.08 -0.25 -0.08 -0.38 c 0 -0.07 0.011 -0.131 0.021 -0.2 c 0.02 -0.061 0.04 -0.12 0.06 -0.19 c 0.03 -0.06 0.061 -0.109 0.09 -0.17 c 0.04 -0.05 0.08 -0.1 0.131 -0.149 c 0.09 -0.091 0.199 -0.171 0.319 -0.221 c 0.37 -0.149 0.82 -0.06 1.09 0.221 c 0.19 0.18 0.29 0.439 0.29 0.71 c 0 0.13 -0.02 0.26 -0.069 0.38 c -0.051 0.12 -0.13 0.229 -0.221 0.319 c -0.09 0.101 -0.199 0.17 -0.319 0.221 C 74.2 53.46 74.08 53.49 73.939 53.49 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 19.65 53.49 c -0.13 0 -0.26 -0.03 -0.38 -0.08 c -0.12 -0.051 -0.23 -0.12 -0.33 -0.221 c -0.18 -0.18 -0.29 -0.43 -0.29 -0.699 c 0 -0.141 0.03 -0.261 0.08 -0.391 c 0.05 -0.12 0.12 -0.229 0.21 -0.319 c 0.28 -0.28 0.73 -0.37 1.09 -0.221 c 0.13 0.05 0.24 0.13 0.33 0.221 c 0.18 0.189 0.29 0.439 0.29 0.71 c 0 0.26 -0.1 0.51 -0.29 0.699 C 20.17 53.38 19.92 53.49 19.65 53.49 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
        </g>
    </svg>,
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="80" height="68" viewBox="70 10 120 220" xmlSpace="preserve">
        <defs>
        </defs>
        <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
            <path d="M 73.347 61.306 c -4.393 0 -7.967 -3.574 -7.967 -7.968 c 0 -4.393 3.574 -7.967 7.967 -7.967 c 4.394 0 7.968 3.574 7.968 7.967 C 81.315 57.732 77.741 61.306 73.347 61.306 z M 73.347 47.372 c -3.29 0 -5.967 2.677 -5.967 5.967 c 0 3.291 2.677 5.968 5.967 5.968 c 3.291 0 5.968 -2.677 5.968 -5.968 C 79.315 50.049 76.638 47.372 73.347 47.372 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 17.245 61.306 c -4.393 0 -7.967 -3.574 -7.967 -7.968 c 0 -4.393 3.574 -7.967 7.967 -7.967 s 7.967 3.574 7.967 7.967 C 25.212 57.732 21.638 61.306 17.245 61.306 z M 17.245 47.372 c -3.29 0 -5.967 2.677 -5.967 5.967 c 0 3.291 2.677 5.968 5.967 5.968 s 5.967 -2.677 5.967 -5.968 C 23.212 50.049 20.535 47.372 17.245 47.372 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 10.922 57.264 c -0.113 0 -0.229 -0.02 -0.341 -0.061 L 2.363 54.22 c -1.673 -0.606 -2.654 -2.377 -2.283 -4.118 l 1.91 -8.965 c 0.379 -1.782 1.843 -3.171 3.643 -3.457 l 8.212 -1.305 c 0.543 -0.085 1.058 0.286 1.145 0.831 c 0.086 0.545 -0.286 1.058 -0.831 1.145 l -8.212 1.305 c -0.988 0.157 -1.792 0.919 -2 1.898 l -1.91 8.966 c -0.164 0.771 0.27 1.553 1.01 1.821 l 8.218 2.985 c 0.519 0.188 0.787 0.762 0.599 1.281 C 11.714 57.013 11.33 57.264 10.922 57.264 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 53.725 39.484 c -0.236 0 -0.474 -0.083 -0.664 -0.252 c -3.739 -3.322 -8.735 -6.218 -14.849 -8.606 c -0.515 -0.201 -0.769 -0.781 -0.568 -1.295 c 0.201 -0.514 0.778 -0.768 1.295 -0.568 c 6.335 2.476 11.534 5.495 15.45 8.975 c 0.413 0.367 0.45 0.999 0.083 1.412 C 54.274 39.371 54 39.484 53.725 39.484 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 79.67 57.264 c -0.504 0 -0.937 -0.38 -0.993 -0.893 c -0.06 -0.549 0.337 -1.042 0.887 -1.102 l 7 -0.76 c 0.507 -0.055 0.947 -0.338 1.209 -0.777 c 0.261 -0.438 0.3 -0.96 0.105 -1.433 c -2.274 -5.55 -7.385 -9.46 -13.337 -10.205 L 53.6 39.477 c -0.548 -0.068 -0.937 -0.568 -0.868 -1.116 c 0.068 -0.547 0.563 -0.937 1.116 -0.868 l 20.94 2.619 c 6.668 0.834 12.392 5.214 14.94 11.431 c 0.434 1.059 0.347 2.23 -0.238 3.214 c -0.586 0.983 -1.574 1.618 -2.712 1.742 l -7.001 0.76 C 79.742 57.263 79.706 57.264 79.67 57.264 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 67.025 57.264 H 23.57 c -0.552 0 -1 -0.447 -1 -1 s 0.448 -1 1 -1 h 43.455 c 0.553 0 1 0.447 1 1 S 67.578 57.264 67.025 57.264 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 44.625 41.526 c -0.21 0 -0.421 -0.003 -0.631 -0.009 l -15.399 -0.75 c -1.956 -0.058 -3.939 -0.281 -5.877 -0.664 l -8.91 -1.76 c -0.541 -0.107 -0.894 -0.633 -0.787 -1.175 c 0.107 -0.541 0.63 -0.897 1.175 -0.787 l 8.91 1.76 c 1.83 0.361 3.703 0.572 5.567 0.627 l 15.399 0.75 c 2.915 0.088 5.878 -0.487 8.565 -1.652 l 0.689 -0.299 c 0.509 -0.219 1.097 0.013 1.315 0.519 c 0.221 0.507 -0.012 1.096 -0.519 1.316 l -0.689 0.299 C 50.671 40.899 47.639 41.526 44.625 41.526 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 73.349 54.34 c -0.27 0 -0.52 -0.11 -0.71 -0.3 c -0.09 -0.09 -0.17 -0.2 -0.22 -0.32 c -0.05 -0.12 -0.07 -0.25 -0.07 -0.38 c 0 -0.13 0.021 -0.26 0.07 -0.38 c 0.05 -0.13 0.13 -0.23 0.22 -0.33 c 0.37 -0.37 1.04 -0.37 1.41 0 c 0.1 0.1 0.17 0.2 0.22 0.33 c 0.05 0.12 0.08 0.25 0.08 0.38 c 0 0.13 -0.03 0.26 -0.08 0.38 c -0.05 0.12 -0.12 0.23 -0.22 0.32 c -0.09 0.1 -0.2 0.17 -0.32 0.22 C 73.609 54.309 73.479 54.34 73.349 54.34 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 17.25 54.34 c -0.27 0 -0.52 -0.11 -0.71 -0.3 c -0.19 -0.181 -0.3 -0.431 -0.3 -0.7 c 0 -0.271 0.11 -0.521 0.3 -0.71 c 0.37 -0.37 1.04 -0.37 1.41 0 c 0.19 0.189 0.3 0.439 0.3 0.71 c 0 0.27 -0.11 0.52 -0.3 0.7 C 17.76 54.229 17.51 54.34 17.25 54.34 z" transform="matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 28.642 40.768 c -0.436 0 -0.836 -0.287 -0.961 -0.727 l -1.271 -4.473 c -0.151 -0.531 0.157 -1.084 0.688 -1.235 c 0.53 -0.153 1.084 0.157 1.235 0.688 l 1.271 4.473 c 0.151 0.531 -0.157 1.084 -0.688 1.235 C 28.825 40.755 28.733 40.768 28.642 40.768 z" transform="matrix(1 0 0 1 0 0) " strokeLinecap="round" />
        </g>
    </svg>,
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="80" height="68" viewBox="70 10 120 220" xmlSpace="preserve">
        <defs>
        </defs>
        <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
            <path d="M 75.442 64.767 c -4.577 0 -8.301 -3.724 -8.301 -8.3 s 3.724 -8.3 8.301 -8.3 c 4.576 0 8.3 3.724 8.3 8.3 S 80.018 64.767 75.442 64.767 z M 75.442 50.167 c -3.475 0 -6.301 2.826 -6.301 6.3 s 2.826 6.3 6.301 6.3 c 3.474 0 6.3 -2.826 6.3 -6.3 S 78.915 50.167 75.442 50.167 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 17.687 64.767 c -4.577 0 -8.3 -3.724 -8.3 -8.3 s 3.724 -8.3 8.3 -8.3 s 8.3 3.724 8.3 8.3 S 22.264 64.767 17.687 64.767 z M 17.687 50.167 c -3.474 0 -6.3 2.826 -6.3 6.3 s 2.826 6.3 6.3 6.3 c 3.474 0 6.3 -2.826 6.3 -6.3 S 21.16 50.167 17.687 50.167 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 11.06 60.531 c -0.121 0 -0.244 -0.021 -0.364 -0.068 L 3.858 57.79 C 1.514 56.875 0 54.657 0 52.141 v -8.826 c 0 -1.093 0.295 -2.166 0.855 -3.105 l 7.279 -12.222 c 1.012 -1.7 2.87 -2.755 4.848 -2.755 h 39.417 c 2.046 0 4 0.875 5.363 2.4 l 6.122 6.849 l 19.194 1.68 c 3.032 0.265 5.464 2.655 5.781 5.682 l 1.099 10.475 c 0.404 3.848 -2.272 7.336 -6.095 7.94 l -1.643 0.26 c -0.543 0.081 -1.057 -0.287 -1.144 -0.833 c -0.086 -0.545 0.287 -1.057 0.833 -1.144 l 1.642 -0.259 c 2.77 -0.438 4.711 -2.967 4.418 -5.756 l -1.099 -10.475 c -0.219 -2.077 -1.887 -3.716 -3.967 -3.898 L 63.317 36.44 c -0.254 -0.022 -0.489 -0.14 -0.658 -0.33 l -6.387 -7.145 c -0.984 -1.102 -2.396 -1.733 -3.872 -1.733 H 12.982 c -1.277 0 -2.477 0.682 -3.129 1.779 l -7.28 12.222 C 2.198 41.863 2 42.583 2 43.315 v 8.826 c 0 1.687 1.015 3.173 2.586 3.786 l 6.839 2.673 c 0.514 0.201 0.768 0.781 0.567 1.296 C 11.838 60.29 11.46 60.531 11.06 60.531 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 68.816 60.531 H 24.314 c -0.552 0 -1 -0.447 -1 -1 s 0.448 -1 1 -1 h 44.502 c 0.553 0 1 0.447 1 1 S 69.368 60.531 68.816 60.531 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 56.207 40.901 H 10.83 c -0.347 0 -0.668 -0.18 -0.851 -0.475 c -0.183 -0.295 -0.199 -0.663 -0.043 -0.973 l 6.844 -13.668 c 0.248 -0.494 0.849 -0.694 1.342 -0.446 c 0.494 0.247 0.694 0.848 0.446 1.342 l -6.119 12.22 h 43.758 c 1.023 0 2.017 -0.365 2.796 -1.027 l 3.753 -3.191 c 0.418 -0.357 1.052 -0.308 1.409 0.114 c 0.357 0.421 0.307 1.052 -0.114 1.41 l -3.753 3.191 C 59.157 40.367 57.704 40.901 56.207 40.901 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 75.44 57.47 c -0.27 0 -0.52 -0.11 -0.71 -0.3 c -0.18 -0.19 -0.29 -0.44 -0.29 -0.7 c 0 -0.14 0.03 -0.26 0.08 -0.39 c 0.05 -0.12 0.12 -0.23 0.21 -0.32 c 0.051 -0.05 0.101 -0.09 0.16 -0.12 c 0.05 -0.04 0.11 -0.07 0.17 -0.1 c 0.061 -0.021 0.12 -0.04 0.19 -0.05 c 0.319 -0.07 0.67 0.04 0.899 0.27 c 0.091 0.09 0.16 0.2 0.21 0.32 c 0.051 0.13 0.08 0.25 0.08 0.39 c 0 0.26 -0.1 0.51 -0.29 0.7 c -0.1 0.1 -0.21 0.17 -0.33 0.22 C 75.7 57.44 75.57 57.47 75.44 57.47 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 17.69 57.47 c -0.27 0 -0.52 -0.11 -0.71 -0.3 c -0.19 -0.18 -0.29 -0.44 -0.29 -0.7 c 0 -0.14 0.02 -0.26 0.07 -0.39 c 0.05 -0.12 0.13 -0.23 0.22 -0.32 c 0.37 -0.37 1.04 -0.37 1.41 0 c 0.19 0.18 0.3 0.44 0.3 0.71 c 0 0.26 -0.11 0.51 -0.3 0.7 c -0.09 0.1 -0.2 0.17 -0.32 0.22 C 17.95 57.44 17.82 57.47 17.69 57.47 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 43.05 40.901 c -0.452 0 -0.861 -0.308 -0.971 -0.767 l -3.28 -13.668 C 38.67 25.93 39 25.39 39.538 25.261 c 0.54 -0.127 1.077 0.202 1.206 0.739 l 3.28 13.668 c 0.129 0.537 -0.202 1.077 -0.739 1.206 C 43.206 40.893 43.127 40.901 43.05 40.901 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 22.262 40.902 c -0.108 0 -0.218 -0.018 -0.327 -0.055 c -0.522 -0.18 -0.799 -0.75 -0.619 -1.272 l 4.72 -13.668 c 0.18 -0.521 0.748 -0.799 1.272 -0.619 c 0.522 0.18 0.799 0.75 0.619 1.272 l -4.72 13.668 C 23.064 40.642 22.677 40.902 22.262 40.902 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
        </g>
    </svg>,
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="80" height="68" viewBox="70 10 120 220" xmlSpace="preserve">
        <defs>
        </defs>
        <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
            <path d="M 76.195 66.43 c -4.226 0 -7.663 -3.438 -7.663 -7.663 c 0 -4.225 3.438 -7.662 7.663 -7.662 s 7.663 3.438 7.663 7.662 C 83.858 62.992 80.421 66.43 76.195 66.43 z M 76.195 53.104 c -3.123 0 -5.663 2.54 -5.663 5.662 c 0 3.123 2.54 5.663 5.663 5.663 s 5.663 -2.54 5.663 -5.663 C 81.858 55.645 79.318 53.104 76.195 53.104 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 19.659 66.43 c -4.226 0 -7.663 -3.438 -7.663 -7.663 c 0 -4.225 3.438 -7.662 7.663 -7.662 s 7.663 3.438 7.663 7.662 C 27.322 62.992 23.884 66.43 19.659 66.43 z M 19.659 53.104 c -3.123 0 -5.663 2.54 -5.663 5.662 c 0 3.123 2.541 5.663 5.663 5.663 s 5.663 -2.54 5.663 -5.663 C 25.322 55.645 22.781 53.104 19.659 53.104 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 5.096 59.792 C 2.285 59.792 0 57.508 0 54.699 V 28.413 c 0 -2.67 2.172 -4.843 4.843 -4.843 h 55.06 c 3.093 0 6 1.364 7.977 3.742 l 9.989 12.02 c 0.354 0.425 0.295 1.055 -0.129 1.408 c -0.428 0.353 -1.057 0.293 -1.408 -0.13 l -9.99 -12.02 c -1.596 -1.919 -3.942 -3.021 -6.438 -3.021 H 4.843 C 3.275 25.57 2 26.845 2 28.413 v 26.287 c 0 1.705 1.387 3.093 3.093 3.093 l 7.899 -0.025 c 0.001 0 0.002 0 0.003 0 c 0.551 0 0.998 0.445 1 0.997 s -0.444 1.001 -0.997 1.003 L 5.096 59.792 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 86.917 59.792 l -4.07 -0.025 c -0.552 -0.007 -0.995 -0.459 -0.988 -1.012 c 0.007 -0.552 0.463 -1.013 1.012 -0.988 l 4.047 0.025 c 0.598 0 1.083 -0.485 1.083 -1.083 v -9.306 c 0 -0.796 -0.467 -1.524 -1.189 -1.857 l -9.931 -4.575 H 57.303 c -1.711 0 -3.103 -1.392 -3.103 -3.102 V 24.747 c 0 -0.552 0.447 -1 1 -1 s 1 0.448 1 1 v 13.122 c 0 0.608 0.494 1.102 1.103 1.102 H 77.1 c 0.145 0 0.287 0.031 0.419 0.092 l 10.129 4.667 C 89.076 44.387 90 45.83 90 47.403 v 9.306 C 90 58.409 88.617 59.792 86.917 59.792 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 69.532 59.767 h -43.21 c -0.552 0 -1 -0.447 -1 -1 s 0.448 -1 1 -1 h 43.21 c 0.553 0 1 0.447 1 1 S 70.085 59.767 69.532 59.767 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 76.2 59.77 c -0.271 0 -0.521 -0.109 -0.71 -0.3 c -0.19 -0.189 -0.301 -0.439 -0.301 -0.7 c 0 -0.27 0.11 -0.529 0.301 -0.71 c 0.369 -0.37 1.04 -0.37 1.409 0 c 0.19 0.19 0.29 0.44 0.29 0.71 c 0 0.261 -0.1 0.511 -0.29 0.7 c -0.09 0.1 -0.199 0.17 -0.319 0.22 C 76.46 59.74 76.33 59.77 76.2 59.77 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
            <path d="M 19.66 59.77 c -0.27 0 -0.52 -0.109 -0.71 -0.3 c -0.19 -0.18 -0.29 -0.43 -0.29 -0.7 c 0 -0.13 0.03 -0.26 0.08 -0.39 c 0.05 -0.12 0.12 -0.23 0.21 -0.32 c 0.37 -0.37 1.04 -0.37 1.42 0 c 0.09 0.09 0.16 0.2 0.21 0.32 c 0.05 0.13 0.08 0.26 0.08 0.39 s -0.03 0.261 -0.08 0.38 c -0.05 0.12 -0.12 0.23 -0.21 0.32 C 20.18 59.66 19.93 59.77 19.66 59.77 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
        </g>
    </svg>,
    // <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="80" height="68" version="1.1" viewBox="0 0 512 512" xmlSpace="preserve">
    //     <g transform="scale(-1, 1)" transform-origin="256 256">
    //         <path d="M119.467,298.667c-37.641,0-68.267,30.626-68.267,68.267c0,37.641,30.626,68.267,68.267,68.267    c37.641,0,68.267-30.626,68.267-68.267C187.733,329.293,157.107,298.667,119.467,298.667z M119.467,418.133    c-28.237,0-51.2-22.963-51.2-51.2c0-28.237,22.963-51.2,51.2-51.2s51.2,22.963,51.2,51.2    C170.667,395.17,147.703,418.133,119.467,418.133z" />
    //         <path d="M392.533,298.667c-37.641,0-68.267,30.626-68.267,68.267c0,37.641,30.626,68.267,68.267,68.267    c37.641,0,68.267-30.626,68.267-68.267C460.8,329.293,430.174,298.667,392.533,298.667z M392.533,418.133    c-28.237,0-51.2-22.963-51.2-51.2c0-28.237,22.963-51.2,51.2-51.2c28.237,0,51.2,22.963,51.2,51.2    C443.733,395.17,420.77,418.133,392.533,418.133z" />
    //         <path d="M503.467,128H262.153l-15.121-45.363c-1.169-3.49-4.42-5.837-8.098-5.837H76.8c-4.71,0-8.533,3.814-8.533,8.533v34.133    c0,4.719,3.823,8.533,8.533,8.533h130.381l49.254,147.763c1.186,3.55,4.497,5.837,8.098,5.837c0.657,0,1.331-0.077,1.997-0.23    l213.333-51.2c2.449-0.589,4.514-2.236,5.641-4.48l25.6-51.2c0.589-1.186,0.896-2.5,0.896-3.823v-34.133    C512,131.814,508.177,128,503.467,128z M494.933,168.653l-22.921,45.85l-201.856,48.444L221.431,116.77    c-1.169-3.49-4.42-5.837-8.098-5.837h-128V93.867h147.448l15.121,45.363c1.161,3.49,4.42,5.837,8.098,5.837h238.933V168.653z" />
    //         <path d="M331.861,294.767c-1.741-3.388-5.521-5.239-9.267-4.463l-77.824,15.565l-48.896-154.837    c-1.126-3.55-4.412-5.965-8.141-5.965H102.4c-3.063,0-5.888,1.638-7.407,4.301l-32.41,56.713L6.187,222.191    C2.526,223.241,0,226.594,0,230.4v102.4c0,3.447,2.082,6.571,5.265,7.885l20.599,8.533c2.261,0.93,4.796,0.862,6.989-0.196    c2.193-1.067,3.823-3.021,4.489-5.359c10.334-36.548,44.109-62.063,82.125-62.063c44.467,0,81.007,33.348,84.983,77.568    c0.401,4.437,4.122,7.765,8.491,7.765c0.137,0,0.265,0,0.393,0h85.333c2.287,0,4.471-0.913,6.067-2.543    c1.604-1.613,2.492-3.814,2.466-6.101c-0.299-23.347,12.143-43.358,22.895-53.385    C332.877,302.302,333.602,298.163,331.861,294.767z M162.133,162.133h19.345l13.474,42.667h-32.819V162.133z M107.349,162.133    h37.717V204.8H82.97L107.349,162.133z M290.475,349.867h-70.016c-8.141-49.169-50.27-85.333-100.992-85.333    c-42.402,0-80.41,26.47-95.514,65.417l-6.886-2.85v-54.033H25.6c4.71,0,8.533-3.814,8.533-8.533S30.31,256,25.6,256h-8.533    v-19.166l52.412-14.967h130.867l30.455,96.435c1.314,4.156,5.555,6.699,9.813,5.803l62.566-12.518    C296.781,322.287,291.789,335.343,290.475,349.867z" />
    //     </g>
    // </svg>
]