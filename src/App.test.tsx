import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { getUsers } from './services/users/getUsers';
import type { User } from './types/User';

// Mock do serviço getUsers
jest.mock('./services/users/getUsers');

const mockUsers: User[] = [
    {
        id: 1,
        name: "Leonardo Silva",
        email: "leo.silva@empresa.com",
        phone: "11-99999-9999",
        username: "leosilva",
        website: "leonardo.com",
        address: {
            street: "Rua das Flores",
            suite: "Apt 101",
            city: "São Paulo",
            zipcode: "01234-567",
            geo: { lat: "-23.5505", lng: "-46.6333" }
        },
        company: {
            name: "Tech Solutions",
            catchPhrase: "Inovação em tecnologia",
            bs: "desenvolvimento de software"
        }
    },
    {
        id: 2,
        name: "Maria Santos",
        email: "maria.santos@corp.com",
        phone: "21-88888-8888",
        username: "mariasantos",
        website: "maria.com",
        address: {
            street: "Avenida Paulista",
            suite: "Sala 502",
            city: "Rio de Janeiro",
            zipcode: "12345-678",
            geo: { lat: "-22.9068", lng: "-43.1729" }
        },
        company: {
            name: "Creative Design",
            catchPhrase: "Design que inspira",
            bs: "design gráfico"
        }
    },
    {
        id: 3,
        name: "Leandro Costa",
        email: "leandro.costa@tech.com",
        phone: "31-77777-7777",
        username: "leandrocosta",
        website: "leandro.com",
        address: {
            street: "Rua do Comércio",
            suite: "Loja 5",
            city: "Belo Horizonte",
            zipcode: "30123-456",
            geo: { lat: "-19.9167", lng: "-43.9345" }
        },
        company: {
            name: "Marketing Pro",
            catchPhrase: "Resultados que vendem",
            bs: "marketing digital"
        }
    }
];

describe('App', () => {
    it('deve renderizar o título', () => {
        (getUsers as jest.Mock).mockResolvedValue(mockUsers);
        render(<App />);

        expect(screen.getByText('Usuários')).toBeInTheDocument();
    });

    it('deve renderizar o campo de busca', () => {
        (getUsers as jest.Mock).mockResolvedValue(mockUsers);
        render(<App />);

        const searchInput = screen.getByPlaceholderText('Buscar usuário...');
        expect(searchInput).toBeInTheDocument();
    });

    it('deve mostrar loading ao carregar usuários', () => {
        (getUsers as jest.Mock).mockResolvedValue(mockUsers);
        render(<App />);

        expect(screen.getByText(/Carregando usuários.../i)).toBeInTheDocument();
    });

    it('deve carregar e exibir lista de usuários', async () => {
        (getUsers as jest.Mock).mockResolvedValue(mockUsers);
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText(/Leonardo Silva/i)).toBeInTheDocument();
            expect(screen.getByText(/Maria Santos/i)).toBeInTheDocument();
            expect(screen.getByText(/Leandro Costa/i)).toBeInTheDocument();
        });
    });

    it('deve filtrar usuários ao digitar no campo de busca', async () => {
        (getUsers as jest.Mock).mockResolvedValue(mockUsers);
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText(/Leonardo Silva/i)).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText('Buscar usuário...');
        fireEvent.change(searchInput, { target: { value: 'maria' } });

        expect(screen.queryByText(/Leonardo Silva/i)).not.toBeInTheDocument();
        expect(screen.getByText(/Maria Santos/i)).toBeInTheDocument();
        expect(screen.queryByText(/Leandro Costa/i)).not.toBeInTheDocument();
    });

    it('deve abrir modal ao clicar em um usuário', async () => {
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText(/Leonardo Silva/i)).toBeInTheDocument();
        });

        expect(screen.queryByText('Detalhes do Usuário')).not.toBeInTheDocument();

        const userItems = screen.getAllByRole('listitem');
        fireEvent.click(userItems[0]);

        await waitFor(() => {
            expect(screen.getByText('Detalhes do Usuário')).toBeInTheDocument();
        });

        const emails = screen.getAllByText(/leo.silva@empresa.com/i);
        expect(emails.length).toBeGreaterThanOrEqual(2);
    });

    it('deve fechar modal ao clicar no botão fechar', async () => {
        (getUsers as jest.Mock).mockResolvedValue(mockUsers);
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText(/Leonardo Silva/i)).toBeInTheDocument();
        });

        const userItems = screen.getAllByRole('listitem');
        fireEvent.click(userItems[0]);

        await waitFor(() => {
            expect(screen.getByText('Detalhes do Usuário')).toBeInTheDocument();
        });

        const closeButton = screen.getByText('Fechar');
        fireEvent.click(closeButton);

        await waitFor(() => {
            expect(screen.queryByText('Detalhes do Usuário')).not.toBeInTheDocument();
        });
    });

    it('deve fechar modal ao clicar no X', async () => {
        (getUsers as jest.Mock).mockResolvedValue(mockUsers);
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText(/Leonardo Silva/i)).toBeInTheDocument();
        });

        const userItems = screen.getAllByRole('listitem');
        fireEvent.click(userItems[0]);

        await waitFor(() => {
            expect(screen.getByText('Detalhes do Usuário')).toBeInTheDocument();
        });

        const closeXButton = screen.getByText('×');
        fireEvent.click(closeXButton);

        await waitFor(() => {
            expect(screen.queryByText('Detalhes do Usuário')).not.toBeInTheDocument();
        });
    });

    it('deve exibir mensagem de erro quando falha ao carregar usuários', async () => {
        (getUsers as jest.Mock).mockRejectedValue(new Error('Erro na API'));
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText(/Erro ao carregar usuarios/i)).toBeInTheDocument();
        });
    });

    it('deve exibir lista vazia quando não há usuários', async () => {
        (getUsers as jest.Mock).mockResolvedValue([]);
        render(<App />);

        await waitFor(() => {
            expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
        });
    });

    it('deve exibir todos os usuários quando o campo de busca está vazio', async () => {
        (getUsers as jest.Mock).mockResolvedValue(mockUsers);
        render(<App />);

        await waitFor(() => {
            const userItems = screen.getAllByRole('listitem');
            expect(userItems).toHaveLength(3);
        });
    });
});