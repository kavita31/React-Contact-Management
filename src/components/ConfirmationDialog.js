import { Button, Modal } from 'semantic-ui-react'

export const ConfirmationDialog = () => {
    return (
        <Modal
            size="mini"
            open={true}>
            <Modal.Header>Delete Your Account</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete your account</p>
            </Modal.Content>
            <Modal.Actions>
                <Button negative >
                    No
                </Button>
                <Button positive >
                    Yes
                </Button>
            </Modal.Actions>
        </Modal>
    );
}