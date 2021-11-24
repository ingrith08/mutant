// eslint-disable-next-line no-shadow
enum errorCodes {
  UNKNOWN_ERROR = 0,
}

type errorOptions = {
  statusCode?: number;
  code?: errorCodes;
  data?: Record<string, unknown>;
  type?: string;
};

/**
 * El proposito de esta clase es proveer errores mas informativos que faciliten la resolucion de problemas usando
 * los logs
 */
class CustomError extends Error {
  /** Codigo HTTP asociado al error */
  statusCode: number;
  /** Codigo para identificar el error de manera general */
  code: number;
  /** Tipo de error (e.g: HttpError) */
  type: string;

  readonly isCustomError = true;
  /** Linea donde ocurrio el error */
  readonly function: string;
  /** Data adicional que se quiera agregar en el error */
  data: Record<string, unknown> | undefined | string;

  /**
   *
   * @param message Mensaje principal del error
   * @param opts Data para incluir en el error
   */
  constructor(message: string, opts?: errorOptions) {
    super(message);
    this.statusCode = opts?.statusCode || 500;
    this.code = opts?.code || 0;
    this.function = CustomError.getLine(this.stack || '');
    this.type = opts?.type || this.name;
    this.name = this.type;
    this.data = opts?.data;
  }

  private static getLine(stack: string): string {
    return stack.split('\n')[1].trim();
  }

  /**
   * Transforma el custom error en un objeto literal
   * @returns Objeto literal con la data del error
   */
  toObject(): Record<string, unknown> {
    const { type, statusCode, code, data } = this;

    return {
      function: this.function,
      type,
      statusCode,
      code,
      data,
    };
  }
}

export default CustomError;
