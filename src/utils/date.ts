export function formatMessageDate(date: Date | null): string {
    if (!date) {
      return '';
    }
    const now = new Date(); 
    const time = date.toLocaleTimeString('da-DK', { 
      hour: '2-digit',
      minute: '2-digit',
    });
    if (date.toDateString() === now.toDateString()) { 
      return time;
    }
    const day = date.toLocaleDateString('da-DK', { 
      day: '2-digit',
      month: '2-digit',
    });
    return `${day} ${time}`;
  }