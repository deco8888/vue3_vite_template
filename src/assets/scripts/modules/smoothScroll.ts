import { isMobile } from './isMobile';

interface SmoothScrollOptions {
    /**
     * target selector
     */
    anchorSelector: string;
}

const defaults: SmoothScrollOptions = {
    anchorSelector: '[data-anchor]',
};

export class SmoothScroll {
    params: SmoothScrollOptions;
    elms: {
        targets: NodeListOf<HTMLElement>;
        header: HTMLElement;
    };
    headerHeight: number;
    threshold: number;
    isMobile: boolean;
    constructor(props: Partial<SmoothScrollOptions> = {}) {
        this.params = { ...defaults, ...props };
        this.elms = {
            targets: document.querySelectorAll(this.params.anchorSelector),
            header: null,
        };
        this.headerHeight = 0;
        this.threshold = this.isMobile ? 50 : 100;
        this.isMobile = isMobile();
        if (this.elms.targets.length > 0) this.init();
    }
    init(): void {
        this.elms.targets.forEach((target) => {
            target.addEventListener('click', (): void => {
                const href = target.getAttribute('href');
                const selector = href.substring(href.indexOf('#'), href.length);
                this.setSmoothScroll(selector);
            });
        });
    }
    setSmoothScroll(selector: string): void {
        const target = document.querySelector<HTMLElement>(selector);
        const targetTop = target.getBoundingClientRect().top;
        const offsetTop = window.pageYOffset;
        // target.style.scrollMarginTop = `${this.headerHeight}px`;
        window.scrollTo({
            top: targetTop + offsetTop,
            behavior: 'smooth',
        });
    }
}
