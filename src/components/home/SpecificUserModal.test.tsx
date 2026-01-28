import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SpecificUserModal } from './SpecificUserModal';
import type { User } from '../../types/User';

const mockUser: User = {
    id: 1,
    name: "João Silva",
    email: "joao@email.com",
    phone: "11-99999-9999",
    username: "joaosilva",
    website: "joao.com",
    address: {
        street: "Rua Teste",
        suite: "Apt 123",
        city: "São Paulo",
        zipcode: "01234-567",
        geo: {
            lat: "-23.5505",
            lng: "-46.6333"
        }
    },
    company: {
        name: "Empresa Teste",
        catchPhrase: "Inovação sempre",
        bs: "Tecnologia"
    }
};

describe('SpecificUserModal', () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        mockOnClose.mockClear();
    });

    it('deve renderizar todos os dados do usuário', () => {
        render(<SpecificUserModal user={mockUser} onClose={mockOnClose} />);

        expect(screen.getByText(/João Silva/i)).toBeInTheDocument();
        expect(screen.getByText(/joao@email.com/i)).toBeInTheDocument();
        expect(screen.getByText(/11-99999-9999/i)).toBeInTheDocument();
        expect(screen.getByText(/Empresa Teste/i)).toBeInTheDocument();
        expect(screen.getByText(/São Paulo/i)).toBeInTheDocument();
    });

    it('deve renderizar o título do modal', () => {
        render(<SpecificUserModal user={mockUser} onClose={mockOnClose} />);

        expect(screen.getByText('Detalhes do Usuário')).toBeInTheDocument();
    });

    it('deve renderizar todos os labels', () => {
        render(<SpecificUserModal user={mockUser} onClose={mockOnClose} />);

        expect(screen.getByText('Nome')).toBeInTheDocument();
        expect(screen.getByText('E-mail')).toBeInTheDocument();
        expect(screen.getByText('Telefone')).toBeInTheDocument();
        expect(screen.getByText('Empresa')).toBeInTheDocument();
        expect(screen.getByText('Cidade')).toBeInTheDocument();
    });

    it('deve chamar onClose ao clicar no botão X', () => {
        render(<SpecificUserModal user={mockUser} onClose={mockOnClose} />);

        const closeButton = screen.getByText('×');
        fireEvent.click(closeButton);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('deve chamar onClose ao clicar no botão Fechar', () => {
        render(<SpecificUserModal user={mockUser} onClose={mockOnClose} />);

        const closeButton = screen.getByText('Fechar');
        fireEvent.click(closeButton);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('deve ter dois botões de fechar', () => {
        render(<SpecificUserModal user={mockUser} onClose={mockOnClose} />);

        const closeXButton = screen.getByText('×');
        const closeButton = screen.getByText('Fechar');

        expect(closeXButton).toBeInTheDocument();
        expect(closeButton).toBeInTheDocument();
    });
});