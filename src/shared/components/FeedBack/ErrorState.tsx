interface ErrorStateProps {
	title: string;
	message: string;
	onRetry?: () => void;
}

export const ErrorState = ({ title, message, onRetry }: ErrorStateProps) => {
	return (
		<section role='alert'>
			<h2>{title}</h2>
      <p>{message}</p>
      {onRetry && (
        <button type='button' onClick={onRetry}>
          Retry
        </button>
      )}
		</section>
	);
};
