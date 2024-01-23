import { NextPageContext } from 'next/dist/shared/lib/utils';
import { SESSION_INSTANCE } from '@/services/session.service';

const sessionBaseUrl = `http://${process.env.HOST}:${process.env.PORT}/api/fetch_session`;

export async function getGenericServerSideProps<T>(context: NextPageContext): Promise<{ props: T }> {
  const { session_id } = context.query;
  if (session_id != null) {
    const value = SESSION_INSTANCE.get(session_id as string);

    console.log('searching for session with id: ' + session_id);
    if (value) {
      SESSION_INSTANCE.remove(session_id as string);
      console.log('found locally');
      return { props: { ...value } };
    } else {
      console.log('did not find locally, sending fetch req');
      const sessionUrl = `${sessionBaseUrl}?session_id=${session_id}`;
      const resp = await fetch(sessionUrl);
      const body = await (resp.json() as Promise<T>);
      return { props: { ...body } };
    }
  }
  throw new Error('Session id should not be null');
}
