export type NormReturn = [boolean, string];
export type NormAsyncFunction = () => Promise<NormReturn>;

export async function handle(
    fn: NormAsyncFunction,
    logMessage: boolean = true,
    throwIfError: boolean = true
) {
    const [success, message] = await fn();
    logMessage && (success ? console.log(message) : console.error(message));
    if (throwIfError && !success) throw new Error(message);
}
