import { Fzf, byStartAsc } from 'fzf';

// Base command interface, we shoudl extend this to add more functionality
// TODO: Sub commands
// TODO: Previews
export interface ICmdCommand {
  command: string;
  help?: string | null;
  action: (arg: this) => void;
}

class CmdCommander {
  count: number = 10;
  displayCount: number = 10;
  position: number = 0;
  commands: ICmdCommand[] = [];
  lastSearch: string = '';
  results: Array<{ selected: boolean; command: string }> = [];

  // The count is the number of results to show
  constructor(count: number) {
    this.position = 0;
    this.count = count;
  }

  // Allow setting/modifying the command list
  async setCommands(commands: ICmdCommand[] | (() => Promise<ICmdCommand[]>) | (() => ICmdCommand[])) {
    if (typeof commands === 'function') {
      this.commands = await commands();
    } else {
      this.commands = commands;
    }
  }

  // Perform a search
  // TODO: perhaps cache fzf? might not be worth it
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

    this.displayCount = results.length;

    return results;
  }

  // Poritional commands:
  getCurrent() {
    const res = this.getList(this.lastSearch);
    return res[this.position].command;
  }

  moveNext() {
    if (this.position < this.displayCount - 1) {
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
