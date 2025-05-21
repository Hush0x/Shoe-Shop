export function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
        return 'Good morning 👋';
    } else if (hour >= 12 && hour < 17) {
        return 'Good afternoon 👋';
    } else if (hour >= 17 && hour < 21) {
        return 'Good evening 👋';
    } else {
        return 'Good night 👋';
    }
}