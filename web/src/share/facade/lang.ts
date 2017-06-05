export function isPresent(obj: any) {
    return obj !== undefined && obj !== null;
}

export const delay = time => new Promise(resolve => setTimeout(resolve, time));