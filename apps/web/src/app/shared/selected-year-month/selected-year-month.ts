import { Service, signal } from '@angular/core';

@Service()
export class SelectedYearMonth {
  readonly yearMonth = signal<string | undefined>(undefined);
}
