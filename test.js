// Load tsparticles
document.addEventListener("DOMContentLoaded", function() {
    tsParticles.load("particles-js", {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    area: 800
                }
            },
            shape: {
                type: ["image", "image2"],
                image: [
                    // { src: "atom.png", width: 100, height: 100 },
                    { src: "./Space_Elements/meteor.png", width: 300, height: 300 },
                    // { src: "html.png" }, 
                    { src: "./Space_Elements/comet.png" },
                    { src: "./Space_Elements/asteroid copy.png" },
                    { src: "./Space_Elements/asteroid-belt.png" },
                    { src: "./Space_Elements/meteorite.png" },
                ],
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 2
                }
            },
            opacity: {
                value: 1
            },
            size: {
                value: { min: 1, max: 8 }
            },
            links: {
                enable: true,
                distance: 150,
                color: "#808080",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                outModes: "out"
            }
        },
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "grab"
                },
                onClick: {
                    enable: true,
                    mode: "push"
                }
            },
            modes: {
                grab: {
                    distance: 140,
                    links: {
                        opacity: 1
                    }
                },
                push: {
                    quantity: 4
                }
            }
        },
        style: {
            position: 'absolute',
            top: 0
        }
    });
});
