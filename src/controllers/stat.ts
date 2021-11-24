import { DefaultContext } from 'koa';
import Mutant from '../repositories/Mutant';

const GetStat = async (ctx: DefaultContext) => {
  const {count_human_dna, count_mutant_dna} = await Mutant.getStat();

  const ratio = count_human_dna === 0 ? 'No existe' : count_mutant_dna / count_human_dna;

  ctx.status = 200;
  ctx.body = {
    count_mutant_dna,
    count_human_dna,
    ratio
  };
}

export default {
  GetStat
};
