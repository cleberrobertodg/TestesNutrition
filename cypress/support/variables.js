//cypress/support/variables.js
import { cpf, cnpj } from 'cpf-cnpj-validator';

export const randomCPF = cpf.generate(); // Gera CPF válido randômico
export const randomCNPJ = cnpj.generate(); // Gera CNPJ válido randômico
export const randomEmail = Math.floor(Math.random() * 1000); // Número entre 0 e 99999
export const email = `cleber+${randomEmail}@encinterativa.com.br`; // Gera email válido
export const randomPhone = `9${Math.floor(10000000000 + Math.random() * 90000000000)}`; // Exemplo: 91234567890
export const randomCupom = Math.floor(Math.random() * 1000);