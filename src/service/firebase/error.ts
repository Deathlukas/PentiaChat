export function errorToMessage(error: unknown): string { // Konverterer en fejl til en brugerdefineret fejlmeddelelse, der kan vises i UI'et.
    if (error instanceof Error) {
      return error.message;
    }
    return 'Der skete en ukendt fejl. Prøv igen.';
  }