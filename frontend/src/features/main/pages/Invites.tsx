import { InvitesList } from '../components/content/lists/InvitesList';
import { RequestsList } from '../../requests/components/RequestsList';

export default function Invites() {
	return (
		<div>
			<InvitesList />
			<RequestsList />
		</div>
	);
}
