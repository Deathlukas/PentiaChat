export function errorToMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Der skete en ukendt fejl. Prøv igen.';
  }