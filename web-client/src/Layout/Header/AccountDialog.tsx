import {DialogContainer} from "../../CommonComponents/DialogContainer";
import {Container} from "@mui/material";
import {useUser} from "../../SWRHooks/useUser";
import {ErrorBoundary} from "react-error-boundary";
import {Suspense} from "react";

export function AccountDialog({open, setOpen}: { open: boolean, setOpen: any }) {
  const onClose = () => {
    setOpen(false);
  }
  return (
    <>
      <DialogContainer
        maxWidth="xs"
        open={open}
        onClose={onClose}
        title="계정 정보"
        buttons={<></>}
      >
        <Container>
          <ErrorBoundary FallbackComponent={() => <h2>ERROR!!!</h2>}>
            <Suspense fallback={<h1>Loading ...</h1>}>
              <AccountInfo />
            </Suspense>
          </ErrorBoundary>
        </Container>
      </DialogContainer>
    </>
  )
}

function AccountInfo() {
  const {user, error, mutate} = useUser();
  return (
    <>
      {JSON.stringify(user)}
    </>
  )
}