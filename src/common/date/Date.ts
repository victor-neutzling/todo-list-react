export default class DateHelper {
    static getCurrentTimeString(): string {
        const d = new Date();
        const minute =
            d.getMinutes().toString().length === 1
                ? "0" + d.getMinutes().toString()
                : d.getMinutes().toString();
        const hour =
            d.getHours().toString().length === 1
                ? "0" + d.getHours().toString()
                : d.getHours().toString();

        const day =
            d.getDay().toString().length === 1
                ? "0" + d.getDay().toString()
                : d.getDay().toString();
        const month =
            d.getMonth().toString().length === 1
                ? "0" + d.getMonth().toString()
                : d.getHours().toString();
        const year = d.getFullYear().toString();

        return `${hour}:${minute} - ${month}/${day}/${year}`;
    }
}
