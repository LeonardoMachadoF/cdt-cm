import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { InfoModalField } from './InfoModalField';

describe('InfoModalField', () => {
    it('deve renderizar o label', () => {
        render(<InfoModalField label="Nome" info="leonardo" />);

        expect(screen.getByText('Nome')).toBeInTheDocument();
    });

    it('deve renderizar a informação', () => {
        render(<InfoModalField label="Email" info="leonardo@email.com" />);

        expect(screen.getByText('leonardo@email.com')).toBeInTheDocument();
    });

    it('deve renderizar label e info corretamente', () => {
        render(<InfoModalField label="Telefone" info="12-99999-9999" />);

        const label = screen.getByText('Telefone');
        const info = screen.getByText('12-99999-9999');

        expect(label).toBeInTheDocument();
        expect(info).toBeInTheDocument();
        expect(label).toHaveClass('text-sm', 'text-gray-500');
        expect(info).toHaveClass('font-medium');
    });

    it('deve aplicar as classes CSS corretas no label', () => {
        render(<InfoModalField label="Cidade" info="São José dos Campos" />);

        const label = screen.getByText('Cidade');
        expect(label).toHaveClass('text-sm', 'text-gray-500');
    });

    it('deve aplicar as classes CSS corretas na info', () => {
        render(<InfoModalField label="Empresa" info="CDT" />);

        const info = screen.getByText('CDT');
        expect(info).toHaveClass('font-medium');
    });
});