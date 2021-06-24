type NotificationType = "positive" | "negative" | "warning";

const NotificationCSSClass = "global-notification";
const wrapperElementID = "global-notifications";

class Notification {
    protected el: HTMLSpanElement;
    protected id: string;
    constructor(protected title: string, protected message: string, protected type: NotificationType, protected delay: number = 0) {
        this.el = document.createElement("span");
        this.id = title.slice(0, 3) + Date.now();

        this.el.classList.add(NotificationCSSClass, type);
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

    main() {
        this.createTitle();
        this.createMessage();
        this.createClosingButton();

        setTimeout(() => {
            document.getElementById(wrapperElementID)?.appendChild(this.el);
        }, this.delay);
    }
}

export default (title: string, message: string, type: NotificationType, delay = 0) => new Notification(title, message, type, delay).main();
