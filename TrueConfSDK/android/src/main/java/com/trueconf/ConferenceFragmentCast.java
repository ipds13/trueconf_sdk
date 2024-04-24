package com.trueconf;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.trueconf.sdk.gui.fragments.ConferenceFragment;

public class ConferenceFragmentCast extends ConferenceFragment {

    public ConferenceFragmentCast(int contentLayoutId) {
        super(contentLayoutId);
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return super.onCreateView(inflater, container, savedInstanceState);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        RelativeLayout gfxFragmentCast = view.findViewById(R.id.gfxFragmentCast);
        ViewGroup insertPoint = view.findViewById(R.id.insert_point);

        addGFXFragment(gfxFragmentCast);
        addGFXSelfViewSurface(insertPoint);
    }
}