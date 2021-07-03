import { Text, Page, Tabs, Card, Link } from '@geist-ui/react';
import { orgName } from '../components/constants';
import { Navbar } from '../components/Navbar';
import NewSponsor from '../components/Tabs/NewSponsor';
import { useActiveUser } from '../components/UserProvider';
import ViewSponsors from '../components/Tabs/ViewSponsors';
import Analytics from '../components/Tabs/Analytics';

export default function Home(): JSX.Element {
  const { user, status } = useActiveUser();

  return (
    <>
      <Navbar />
      <Page className="homepage-container">
        <Text h2 style={{ marginBottom: '5px' }}>
          Nexus
        </Text>
        <Text className="sub-heading">{orgName} Sponsorship System</Text>
        {/* If user is not admin, deny access and prompt them to login */}
        {!user?.isAdmin ? (
          <Card>
            <h4>Access Denied</h4>
            <p>You do not have admin priviledges to send emails. Please login to an admin account to send bulk emails.</p>
            <Card.Footer>
              <Link color block href="/auth/login?r=/nexus/">
                Login
              </Link>
            </Card.Footer>
          </Card>
        ) : (
          <Tabs initialValue="1">
            <Tabs.Item label="Add Sponsor" value="1">
              <NewSponsor />
            </Tabs.Item>
            <Tabs.Item label="View Sponsors" value="2">
              <ViewSponsors />
            </Tabs.Item>
            <Tabs.Item label="Analytics" value="3">
              <Analytics />
            </Tabs.Item>
          </Tabs>
        )}
      </Page>
    </>
  );
}
