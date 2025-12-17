// AI Solutions - Main JavaScript File
// Handles all interactions, animations, and visual effects

// Global variables
let neuralNetwork;
let performanceChart;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    initNeuralNetwork();
    initPerformanceChart();
    initCounters();
    initServiceCards();
    initScrollAnimations();
});

// Initialize page animations
function initAnimations() {
    // Hero text animation
    anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    })
    .add({
        targets: '#hero-title',
        translateY: [100, 0],
        opacity: [0, 1],
        delay: 500
    })
    .add({
        targets: '#hero-subtitle',
        translateY: [100, 0],
        opacity: [0, 1],
        delay: 200
    }, '-=800')
    .add({
        targets: '#hero-desc',
        translateY: [50, 0],
        opacity: [0, 1],
        delay: 300
    }, '-=600')
    .add({
        targets: '#hero-text',
        translateY: [30, 0],
        opacity: [0, 1],
        delay: 400
    }, '-=400')
    .add({
        targets: '#hero-buttons button',
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(200, {start: 500})
    }, '-=200');

    // Service cards stagger animation
    anime({
        targets: '.service-card',
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(150, {start: 1500}),
        duration: 800,
        easing: 'easeOutExpo'
    });
}

// Initialize neural network visualization using p5.js
function initNeuralNetwork() {
    new p5(function(p) {
        let nodes = [];
        let connections = [];
        let particles = [];
        
        p.setup = function() {
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('p5-canvas');
            
            // Create nodes
            for (let i = 0; i < 50; i++) {
                nodes.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(3, 8),
                    alpha: p.random(100, 255)
                });
            }
            
            // Create connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    let dist = p.dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                    if (dist < 150) {
                        connections.push({
                            from: i,
                            to: j,
                            alpha: p.map(dist, 0, 150, 100, 0)
                        });
                    }
                }
            }
        };
        
        p.draw = function() {
            p.clear();
            
            // Update and draw nodes
            for (let node of nodes) {
                node.x += node.vx;
                node.y += node.vy;
                
                // Bounce off edges
                if (node.x < 0 || node.x > p.width) node.vx *= -1;
                if (node.y < 0 || node.y > p.height) node.vy *= -1;
                
                // Draw node
                p.fill(0, 212, 255, node.alpha);
                p.noStroke();
                p.ellipse(node.x, node.y, node.size);
                
                // Add glow effect
                p.fill(139, 92, 246, node.alpha * 0.3);
                p.ellipse(node.x, node.y, node.size * 2);
            }
            
            // Draw connections
            for (let conn of connections) {
                let from = nodes[conn.from];
                let to = nodes[conn.to];
                
                p.stroke(0, 212, 255, conn.alpha);
                p.strokeWeight(1);
                p.line(from.x, from.y, to.x, to.y);
            }
            
            // Add floating particles
            if (p.random() < 0.1) {
                particles.push({
                    x: p.random(p.width),
                    y: p.height + 10,
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-2, -1),
                    life: 255
                });
            }
            
            // Update and draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
                let particle = particles[i];
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life -= 2;
                
                p.fill(0, 212, 255, particle.life);
                p.noStroke();
                p.ellipse(particle.x, particle.y, 2);
                
                if (particle.life <= 0) {
                    particles.splice(i, 1);
                }
            }
        };
        
        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    });
}

// Initialize performance chart
function initPerformanceChart() {
    const chartDom = document.getElementById('performance-chart');
    performanceChart = echarts.init(chartDom);
    
    const option = {
        backgroundColor: 'transparent',
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            axisLine: { lineStyle: { color: '#64748b' } },
            axisLabel: { color: '#94a3b8' }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#64748b' } },
            axisLabel: { color: '#94a3b8' },
            splitLine: { lineStyle: { color: '#374151' } }
        },
        series: [
            {
                name: 'Processing Speed',
                type: 'line',
                data: [85, 92, 88, 95, 90, 87],
                smooth: true,
                lineStyle: { color: '#00d4ff', width: 3 },
                itemStyle: { color: '#00d4ff' },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(0, 212, 255, 0.3)' },
                            { offset: 1, color: 'rgba(0, 212, 255, 0.05)' }
                        ]
                    }
                }
            },
            {
                name: 'Accuracy Rate',
                type: 'line',
                data: [96, 94, 97, 95, 98, 96],
                smooth: true,
                lineStyle: { color: '#8b5cf6', width: 3 },
                itemStyle: { color: '#8b5cf6' },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(139, 92, 246, 0.3)' },
                            { offset: 1, color: 'rgba(139, 92, 246, 0.05)' }
                        ]
                    }
                }
            }
        ],
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#1f2937',
            borderColor: '#374151',
            textStyle: { color: '#f9fafb' }
        }
    };
    
    performanceChart.setOption(option);
    
    // Animate chart data
    setInterval(() => {
        const newData1 = option.series[0].data.map(() => Math.floor(Math.random() * 20) + 80);
        const newData2 = option.series[1].data.map(() => Math.floor(Math.random() * 10) + 90);
        
        option.series[0].data = newData1;
        option.series[1].data = newData2;
        performanceChart.setOption(option);
    }, 3000);
}

// Initialize animated counters
function initCounters() {
    const counters = [
        { id: 'speed-counter', target: 95, suffix: '%' },
        { id: 'accuracy-counter', target: 96, suffix: '%' },
        { id: 'savings-counter', target: 73, suffix: '%' },
        { id: 'clients-counter', target: 2500, suffix: '+' },
        { id: 'automation-counter', target: 15000, suffix: '+' },
        { id: 'savings-percent-counter', target: 45, suffix: '%' },
        { id: 'uptime-counter', target: 99.9, suffix: '%' }
    ];
    
    counters.forEach(counter => {
        animateCounter(counter.id, counter.target, counter.suffix);
    });
}

// Animate counter function
function animateCounter(id, target, suffix = '') {
    const element = document.getElementById(id);
    if (!element) return;
    
    anime({
        targets: { value: 0 },
        value: target,
        duration: 2000,
        delay: 1000,
        easing: 'easeOutExpo',
        update: function(anim) {
            const value = anim.animatables[0].target.value;
            element.textContent = Math.floor(value) + suffix;
        }
    });
}

// Initialize service cards interactions
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const service = this.dataset.service;
            handleServiceClick(service);
        });
        
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Handle service card clicks
function handleServiceClick(service) {
    const serviceUrls = {
        automation: 'services.html#automation',
        analytics: 'services.html#analytics',
        agents: 'services.html#agents',
        intelligence: 'services.html#intelligence',
        industry: 'solutions.html',
        transformation: 'contact.html'
    };
    
    // Add click animation
    const card = document.querySelector(`[data-service="${service}"]`);
    anime({
        targets: card,
        scale: [1, 0.95, 1],
        duration: 200,
        easing: 'easeInOutQuad',
        complete: () => {
            if (serviceUrls[service]) {
                window.location.href = serviceUrls[service];
            }
        }
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.classList.contains('service-card')) {
                    anime({
                        targets: element,
                        translateY: [30, 0],
                        opacity: [0, 1],
                        duration: 600,
                        easing: 'easeOutExpo'
                    });
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
}

// Navigation handling
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Button click handlers
    const ctaButtons = document.querySelectorAll('button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('Get Started') || this.textContent.includes('Schedule')) {
                window.location.href = 'contact.html';
            } else if (this.textContent.includes('Explore')) {
                window.location.href = 'services.html';
            }
        });
    });
});

// Handle window resize
window.addEventListener('resize', function() {
    if (performanceChart) {
        performanceChart.resize();
    }
});

// Add loading states and error handling
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Hide loading indicators
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => {
        el.style.display = 'none';
    });
});

// Error handling for missing elements
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    // Handle scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);