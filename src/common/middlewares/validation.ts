import { Middleware, DefaultContext } from 'koa';

const validation: Middleware<Record<string, unknown>> = async (ctx, next) => {
    const { request: { body: { dna } } } = ctx;

    validateRequired(ctx, dna);
	validateLength(ctx, dna);
	validateLetters(ctx, dna);

    await next();
};

const validateRequired = (ctx: DefaultContext, dna: [string]) => {
    if (!dna || dna.length <= 0) {
        ctx.throw(400, 'El ADN es requerido');
    }
}

const validateLength = (ctx: DefaultContext, dna: [string]) => {
    const numberSequences = dna.length;
    dna.map((nitrogenBase)=> {
        if (numberSequences !== nitrogenBase.length) {
            ctx.throw(400, 'La matriz debe ser simetrica (NxN)');
        }
    })
}

const validateLetters = (ctx: DefaultContext, dna: [string]) => {
    dna.map((nitrogenBase)=> {
        const pattern = new RegExp('^[ATGC]+$', 'i');
        if (!pattern.test(nitrogenBase)) {
            ctx.throw(400, 'Letra de base nitrogenada inválida');
        }
    })
}
export default validation;
