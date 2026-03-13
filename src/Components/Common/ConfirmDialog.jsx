import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useLanguage } from "../../context/LanguageContext";
import { TRANSLATIONS } from "../../utils/constants";

const ConfirmDialog = ({ open, onClose, onConfirm, messageKey }) => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t.confirmDelete}</DialogTitle>
      <DialogContent>
        <Typography>{messageKey || t.confirmDelete}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          {t.no}
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          {t.yes}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
