type NotificationType = "positive" | "negative" | "warning";

const notificationCSSClass = "global-notification";
const wrapperElementID = "global-notifications";
const DEFAULT_DURATION = 10000;

class Notification {
    protected el: HTMLSpanElement;
    protected id: string;
    protected timer: HTMLSpanElement | null = null;

    constructor(
        protected title: string, // ⚡
        protected message: string,
        protected type: NotificationType,
        protected delay: number = 0,
        protected duration: number | "infinite" = DEFAULT_DURATION
    ) {
        this.el = document.createElement("span");
        this.id = title.slice(0, 3) + Date.now();

        this.el.classList.add(notificationCSSClass, type);
        this.el.setAttribute("id", this.id);
    }

    protected createTitle() {
        const title = document.createElement("h3");
        title.textContent = this.title;
        this.el.appendChild(title);
    }
    protected createMessage() {
        const msg = document.createElement("p");
        msg.textContent = this.message;
        this.el.appendChild(msg);
    }
    protected createClosingButton() {
        const btn = document.createElement("button");
        btn.textContent = "Close";
        btn.addEventListener("click", () => {
            this.el.remove();
        });
        this.el.appendChild(btn);
    }
    protected createTimerBar() {
        this.timer = document.createElement("span");
        this.timer.classList.add("timer");
        this.el.appendChild(this.timer);
    }
    protected startTimer() {
        this.timer?.setAttribute("style", `animation: scaleWidth ${this.duration}ms both reverse linear`);
    }

    protected prepareNotification() {
        this.createTitle();
        if (this.duration !== "infinite") this.createTimerBar();
        this.createMessage();
        this.createClosingButton();
    }

    protected displayNotification() {
        document.getElementById(wrapperElementID)?.appendChild(this.el);
        this.el.setAttribute("style", "animation: fade-only-opacity .5s both");
        this.startTimer();
    }

    protected closeNotification() {
        this.el.setAttribute("style", "animation: fade-only-opacity-out .5s both");
        setTimeout(() => {
            this.el.remove();
        }, 500);
    }

    main() {
        this.prepareNotification();
        // Intro
        setTimeout(this.displayNotification.bind(this), this.delay);
        // Outro
        if (this.duration !== "infinite") setTimeout(this.closeNotification.bind(this), this.duration + this.delay + 100);
    }
}

export default (title: string, message: string, type: NotificationType, delay = 0, duration = DEFAULT_DURATION) => new Notification(title, message, type, delay, duration).main();
