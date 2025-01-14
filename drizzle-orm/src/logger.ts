export interface Logger {
	logQuery(query: string, params: unknown[]): void;
}

export interface LogWriter {
	write(message: string): void;
}

export class ConsoleLogWriter implements LogWriter {
	write(message: string) {
		console.log(message);
	}
}

export class DefaultLogger implements Logger {
	readonly writer: LogWriter;

	constructor(config?: { writer: LogWriter }) {
		this.writer = config?.writer ?? new ConsoleLogWriter();
	}

	logQuery(query: string, params: unknown[]): void {
		const stringifiedParams = params.map((p) => {
			try {
				return JSON.stringify(p);
			} catch {
				return String(p);
			}
		});
		const paramsStr = stringifiedParams.length ? ` -- params: [${stringifiedParams.join(', ')}]` : '';
		this.writer.write(`Query: ${query}${paramsStr}`);
	}
}

export class NoopLogger implements Logger {
	logQuery(): void {
		// noop
	}
}
