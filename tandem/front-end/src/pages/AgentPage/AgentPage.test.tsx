import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AgentPage } from './AgentPage';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import '@testing-library/jest-dom/vitest';
import { INTERVIEW_LEVEL_STORAGE_KEY } from '../../types/interviewLevel';

const sendMock = vi.fn();
const setInputMock = vi.fn();

const beginInterviewSessionMock = vi.fn();

vi.mock('../../hooks/chatHooks/useChat', () => ({
  useChat: vi.fn(() => ({
    messages: [{ id: '1', role: 'assistant', content: 'Hi! How can I help you?' }],
    input: '',
    setInput: setInputMock,
    send: sendMock,
    loading: false,
    latestAssistantStreamDone: false,
    bottomRef: { current: null },
    beginInterviewSession: beginInterviewSessionMock,
  })),
}));

interface MockLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children?: ReactNode;
}

vi.mock('react-router', () => ({
  Link: ({ to, children, ...rest }: MockLinkProps) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));

import { useChat } from '../../hooks/chatHooks/useChat';

const mockUseChat = useChat as ReturnType<typeof vi.fn>;

function renderPage() {
  return render(<AgentPage />);
}



describe('AgentPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    localStorage.setItem(INTERVIEW_LEVEL_STORAGE_KEY, 'junior');

    Element.prototype.scrollIntoView = vi.fn();

    mockUseChat.mockReturnValue({
      messages: [{ id: '1', role: 'assistant', content: 'Hi! How can I help you?' }],
      input: '',
      setInput: setInputMock,
      send: sendMock,
      loading: false,
      latestAssistantStreamDone: false,
      bottomRef: { current: null },
      beginInterviewSession: beginInterviewSessionMock,
    });
  });

  afterEach(() => {
    localStorage.removeItem(INTERVIEW_LEVEL_STORAGE_KEY);
  });

  it('renders the initial assistant greeting message', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText('Hi! How can I help you?')).toBeInTheDocument();
    });
  });

  it('renders the chat header with the agent title', () => {
    renderPage();
    expect(screen.getByText('Tandem AI Agent')).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();
  });

  it('updates the input value when the user types', () => {
    renderPage();
    const input = screen.getByPlaceholderText('Ask anything about your code...');
    fireEvent.change(input, { target: { value: 'Hello AI' } });
    expect(setInputMock).toHaveBeenCalledWith('Hello AI');
  });

  it('calls send when the Send button is clicked', () => {
    mockUseChat.mockReturnValue({
      messages: [{ id: '1', role: 'assistant', content: 'Hi! How can I help you?' }],
      input: 'test message',
      setInput: setInputMock,
      send: sendMock,
      loading: false,
      latestAssistantStreamDone: false,
      bottomRef: { current: null },
      beginInterviewSession: beginInterviewSessionMock,
    });

    renderPage();

    const buttons = screen.getAllByRole('button');
    const sendButton = buttons[buttons.length - 1];
    fireEvent.click(sendButton);

    expect(sendMock).toHaveBeenCalled();
  });

  it('disables the input and Send button while loading', () => {
    mockUseChat.mockReturnValue({
      messages: [
        { id: '1', role: 'assistant', content: 'Hi! How can I help you?' },
        { id: '2', role: 'user', content: 'Hello' },
        { id: '3', role: 'assistant', content: '' },
      ],
      input: '',
      setInput: setInputMock,
      send: sendMock,
      loading: true,
      latestAssistantStreamDone: false,
      bottomRef: { current: null },
      beginInterviewSession: beginInterviewSessionMock,
    });

    renderPage();

    const input = screen.getByPlaceholderText('Ask anything about your code...');
    expect(input).toBeDisabled();

    const buttons = screen.getAllByRole('button');
    const sendButton = buttons[buttons.length - 1];
    expect(sendButton).toBeDisabled();
  });
});
