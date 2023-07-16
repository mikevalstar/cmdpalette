import { Fzf, byStartAsc } from 'fzf';

export type CmdCommand = {
  command: string;
  action: (arg: CmdCommand) => void;
};

class CmdCommander {
  id: string = '';
  position: number = 0;
  commands: CmdCommand[] = [];
  lastSearch: string = '';
  lastUpdate: number = 55;
  results: Array<{ selected: boolean; command: string }> = [];

  constructor(commands: CmdCommand[]) {
    this.position = 0;
    this.commands = commands;
  }

  setCommands(commands: CmdCommand[]) {
    this.commands = commands;
  }

  getList(
    search: string,
    count: number,
  ): Array<{
    selected: boolean;
    command: CmdCommand;
    positions: Set<number>;
    score: number;
  }> {
    if (search !== this.lastSearch) {
      this.position = 0;
    }
    this.lastSearch = search;

    const fzf = new Fzf(this.commands, {
      selector: (m) => m.command,
      limit: count,
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
    const res = this.getList(this.lastSearch, this.position + 1);
    return res[this.position].command;
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
