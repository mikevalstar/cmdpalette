import { Fzf, byStartAsc } from 'fzf';

class CmdCommander {
  id: string = '';
  position: number = 0;
  commands: string[] = [];
  lastSearch: string = '';
  lastUpdate: number = 55;
  results: Array<{ selected: boolean; command: string }> = [];

  constructor(commands: string[]) {
    this.position = 0;
    this.commands = commands;
  }

  setCommands(commands: string[]) {
    this.commands = commands;
  }

  getList(
    search: string,
    count: number,
  ): Array<{
    selected: boolean;
    command: string;
    positions: Set<number>;
    score: number;
  }> {
    if (search !== this.lastSearch) {
      this.position = 0;
    }
    this.lastSearch = search;

    const fzf = new Fzf(this.commands, { limit: count, tiebreakers: [byStartAsc] });
    const entries = fzf.find(search);

    const results = entries.map((m, i) => {
      return {
        selected: i === this.position,
        command: m.item,
        positions: m.positions,
        score: m.score,
      };
    });

    return results;
  }

  moveNext() {
    this.position++;
  }

  movePrev() {
    if (this.position > 0) {
      this.position--;
    }
  }
}

export default CmdCommander;
