export const cleanPath = (inputPath: string) => {
    return inputPath.replace(/["']+/g, '');
}