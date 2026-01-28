import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserItem } from './UserItem';

describe('UserItem', () => {
    const mockHandleClick = jest.fn();

    it('deve renderizar nome e email do usuário', () => {
        render(
            <UserItem
                id={1}
                name="leonardo machado"
                email="leonardo@email.com"
                handleUserItemClick={mockHandleClick}
            />
        );

        expect(screen.getByText(/leonardo machado/i)).toBeInTheDocument();
        expect(screen.getByText(/leonardo@email.com/i)).toBeInTheDocument();
    });

    it('deve chamar handleUserItemClick ao clicar', () => {
        render(
            <UserItem
                id={1}
                name="leonardo machado"
                email="leonardo@email.com"
                handleUserItemClick={mockHandleClick}
            />
        );

        const userItem = screen.getByRole('listitem');
        fireEvent.click(userItem);

        expect(mockHandleClick).toHaveBeenCalledWith(1);
        expect(mockHandleClick).toHaveBeenCalledTimes(1);
    });
});