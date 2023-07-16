import { Fzf, byStartAsc } from 'fzf';

export interface ICmdCommand {
  command: string;
  action: (arg: this) => void;
}

class CmdCommander {
  count: number = 10;
  position: number = 0;
  commands: ICmdCommand[] = [];
  lastSearch: string = '';
  results: Array<{ selected: boolean; command: string }> = [];

  constructor(count: number) {
    this.position = 0;
    this.count = count;
  }

  async setCommands(commands: ICmdCommand[] | (() => Promise<ICmdCommand[]>) | (() => ICmdCommand[])) {
    if (typeof commands === 'function') {
      this.commands = await commands();
    } else {
      this.commands = commands;
    }
  }

  getList(search: string): Array<{
    selected: boolean;
    command: ICmdCommand;
    positions: Set<number>;
    score: number;
  }> {
    if (search !== this.lastSearch) {
      this.position = 0;
    }
    this.lastSearch = search;

    const fzf = new Fzf(this.commands, {
      selector: (m) => m.command,
      limit: this.count,
      tiebreakers: [byStartAsc],
    });
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

  getCurrent() {
    const res = this.getList(this.lastSearch);
    return res[this.position].command;
  }

  moveNext() {
    if (this.position < this.count - 1) {
      this.position++;
    }
  }

  movePrev() {
    if (this.position > 0) {
      this.position--;
    }
  }
}

export default CmdCommander;
